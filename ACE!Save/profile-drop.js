document.addEventListener("DOMContentLoaded", function () {
    const profileBtn = document.getElementById("profileBtn");
    const profilePanel = document.getElementById("profilePanel");
    const logoutBtn = document.getElementById("logoutBtn");
    const profileName = document.querySelector(".profile-details h3");
    const profileEmail = document.querySelector(".profile-details p");
    const profileAvatar = document.querySelector(".profile-avatar");
    const savedUser = (() => {
        try {
            return JSON.parse(localStorage.getItem("aceSaveUser") || "null");
        } catch (error) {
            console.error("Could not read the saved user profile.", error);
            return null;
        }
    })();
    const notificationLink = document.querySelector('.profile-panel a[href="notifications.html"]');
    const orderKey = savedUser && typeof savedUser.email === "string"
        ? "aceSaveLastOrder:" + encodeURIComponent(savedUser.email.toLowerCase())
        : null;

    function updateNotificationIndicator() {
        if (!notificationLink) return;
        let hasNotification = false;
        try {
            const savedOrder = orderKey ? localStorage.getItem(orderKey) : null;
            const order = savedOrder ? JSON.parse(savedOrder) : null;
            hasNotification = Boolean(
                order &&
                order.trackingNumber &&
                order.customer &&
                order.notificationDismissed !== true
            );
        } catch (error) {
            console.error("Could not read the order notification indicator.", error);
        }
        notificationLink.textContent = hasNotification ? "Notifications (1)" : "Notifications";
        notificationLink.setAttribute(
            "aria-label",
            hasNotification ? "Notifications, 1 new order update" : "Notifications"
        );
    }

    updateNotificationIndicator();
    window.ACESaveNotifications = { refreshIndicator: updateNotificationIndicator };
    window.addEventListener("storage", function (event) {
        if (event.key === orderKey) updateNotificationIndicator();
    });

    function setProfileDetails(user) {
        const name = user && typeof user.name === "string" ? user.name.trim() : "";
        const email = user && typeof user.email === "string" ? user.email.trim() : "";
        const initials = name ? name.charAt(0).toUpperCase() : "G";

        if (profileName) {
            profileName.textContent = name || "Guest";
        }
        if (profileEmail) {
            profileEmail.textContent = email || "Create an account";
        }
        if (profileAvatar) {
            profileAvatar.textContent = initials;
        }
        if (profileBtn) {
            profileBtn.textContent = initials;
        }
    }

    setProfileDetails(savedUser);

    if (profileBtn && profilePanel) {
        profileBtn.addEventListener("click", function (event) {
            event.stopPropagation();

            const isOpen = profilePanel.classList.toggle("show");

            profileBtn.setAttribute("aria-expanded", isOpen);
        });
    }

    document.addEventListener("click", function (event) {
        if (
            profilePanel &&
            profileBtn &&
            !profilePanel.contains(event.target) &&
            !profileBtn.contains(event.target)
        ) {
            profilePanel.classList.remove("show");
            profileBtn.setAttribute("aria-expanded", "false");
        }
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            if (profilePanel) {
                profilePanel.classList.remove("show");
            }
            if (profileBtn) {
                profileBtn.setAttribute("aria-expanded", "false");
            }
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            if (profilePanel) {
                profilePanel.classList.remove("show");
            }
            if (profileBtn) {
                profileBtn.setAttribute("aria-expanded", "false");
            }
            localStorage.removeItem("aceSaveUser");
            setProfileDetails(null);
            window.location.assign("menu.html");
        });
    }
});