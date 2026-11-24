(function () {
    const accountsKey = "aceSaveAccounts";
    const sessionKey = "aceSaveUser";
    const pendingPageKey = "aceSavePendingPage";

    function getSession() {
        try {
            const user = JSON.parse(localStorage.getItem(sessionKey) || "null");
            return user && typeof user.email === "string" ? user : null;
        } catch (error) {
            console.error("Could not read the signed-in user.", error);
            return null;
        }
    }

    function getReturnPage() {
        const requestedPage = new URLSearchParams(window.location.search).get("return");
        const allowedPages = ["order.html", "order-signin.html", "menu-signin.html", "home-signin.html"];
        let destination = requestedPage;
        if (!allowedPages.includes(destination)) {
            try {
                const pendingPage = localStorage.getItem(pendingPageKey);
                destination = allowedPages.includes(pendingPage) ? pendingPage : "home-signin.html";
            } catch (error) {
                console.error("Could not read the requested destination.", error);
                destination = "home-signin.html";
            }
        }
        return destination === "order.html" ? "order-signin.html" : destination;
    }

    function redirectAfterSignIn() {
        const page = getReturnPage();
        try {
            localStorage.removeItem(pendingPageKey);
        } catch (error) {
            console.error("Could not clear the requested destination.", error);
        }
        window.location.assign(page);
    }

    async function hashPassword(password, salt) {
        const encodedPassword = new TextEncoder().encode(salt + password);
        const hash = await window.crypto.subtle.digest("SHA-256", encodedPassword);
        return Array.from(new Uint8Array(hash)).map(function (byte) {
            return byte.toString(16).padStart(2, "0");
        }).join("");
    }

    function showAuthMessage(message, isError) {
        const messageBox = document.getElementById("auth-message");
        if (messageBox) {
            messageBox.textContent = message;
            messageBox.classList.toggle("error", Boolean(isError));
        }
    }

    function readAccounts() {
        const accounts = JSON.parse(localStorage.getItem(accountsKey) || "[]");
        if (!Array.isArray(accounts)) throw new Error("Saved accounts are not in the expected format.");
        return accounts;
    }

    function initializeSignIn() {
        const form = document.getElementById("signin-form");
        if (!form) return;
        if (new URLSearchParams(window.location.search).has("return")) {
            showAuthMessage("Sign in or create an account to access your cart and delivery information.", false);
        }
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            const data = new FormData(form);
            const email = String(data.get("email")).trim().toLowerCase();
            const password = String(data.get("password"));
            try {
                const account = readAccounts().find(function (savedAccount) {
                    return savedAccount.email === email;
                });
                if (!account || await hashPassword(password, account.salt) !== account.passwordHash) {
                    showAuthMessage("Email or password is incorrect. Create an account if you have not registered yet.", true);
                    return;
                }
                const fullName = account.name || "";
                const splitName = fullName.trim().split(/\s+/);
                localStorage.setItem(sessionKey, JSON.stringify({
                    email: account.email,
                    name: account.name,
                    firstName: splitName[0] || "",
                    lastName: splitName.slice(1).join(" ") || "",
                    address: account.address,
                    addressDetails: account.addressDetails || {}
                }));
                redirectAfterSignIn();
            } catch (error) {
                console.error("Could not sign in.", error);
                showAuthMessage("Sign-in could not be completed. Check browser storage and try again.", true);
            }
        });
    }

    function initializeSignUp() {
        const form = document.getElementById("signup-form");
        if (!form) return;
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            const data = new FormData(form);
            const email = String(data.get("email")).trim().toLowerCase();
            const password = String(data.get("password"));
            const confirmPassword = String(data.get("confirmPassword"));
            if (password !== confirmPassword) {
                showAuthMessage("Passwords do not match.", true);
                return;
            }
            try {
                const accounts = readAccounts();
                if (accounts.some(function (account) { return account.email === email; })) {
                    showAuthMessage("An account with this email already exists. Please sign in.", true);
                    return;
                }
                const saltBytes = new Uint8Array(16);
                window.crypto.getRandomValues(saltBytes);
                const salt = Array.from(saltBytes).map(function (byte) {
                    return byte.toString(16).padStart(2, "0");
                }).join("");
                const account = {
                    email: email,
                    name: (String(data.get("firstName")).trim() + " " + String(data.get("lastName")).trim()).trim(),
                    address: String(data.get("address")).trim(),
                    salt: salt,
                    passwordHash: await hashPassword(password, salt)
                };
                accounts.push(account);
                localStorage.setItem(accountsKey, JSON.stringify(accounts));
                const fullName = account.name || "";
                const splitName = fullName.trim().split(/\s+/);
                localStorage.setItem(sessionKey, JSON.stringify({
                    email: account.email,
                    name: account.name,
                    firstName: splitName[0] || "",
                    lastName: splitName.slice(1).join(" ") || "",
                    address: account.address,
                    addressDetails: account.addressDetails || {}
                }));
                redirectAfterSignIn();
            } catch (error) {
                console.error("Could not create an account.", error);
                showAuthMessage("Account creation could not be completed. Check browser storage and try again.", true);
            }
        });
    }

    function protectAccountPage() {
        if (document.body.dataset.requiresAccount !== "true") return;
        if (getSession()) {
            if (window.location.pathname.endsWith("/order.html")) {
                document.body.hidden = true;
                window.location.replace("order-signin.html");
            }
            return;
        }
        document.body.hidden = true;
        try {
            localStorage.setItem(pendingPageKey, window.location.pathname.endsWith("order-signin.html") ? "order-signin.html" : "order.html");
        } catch (error) {
            console.error("Could not save the requested destination.", error);
        }
        window.location.replace("registration-signin.html?return=" + encodeURIComponent(window.location.pathname.endsWith("order-signin.html") ? "order-signin.html" : "order.html"));
    }

    function protectCartLinks() {
        if (getSession()) return;
        document.querySelectorAll('a[href="order.html"], a[href="order-signin.html"]').forEach(function (link) {
            link.href = "registration-signin.html?return=order.html";
        });
    }

    window.ACESaveAuth = {
        isAuthenticated: function () { return Boolean(getSession()); },
        getUser: getSession
    };

    protectAccountPage();
    window.addEventListener("pageshow", protectAccountPage);
    document.addEventListener("DOMContentLoaded", function () {
        protectCartLinks();
        initializeSignIn();
        initializeSignUp();
    });
})();
