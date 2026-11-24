(function () {
    const sessionKey = "aceSaveUser";
    const accountsKey = "aceSaveAccounts";
    const paymentKey = "aceSavePayment";

    function getUser() {
        try {
            return JSON.parse(localStorage.getItem(sessionKey) || "null");
        } catch (error) {
            console.error("Could not read saved account details.", error);
            return null;
        }
    }

    function getPayment() {
        try {
            return JSON.parse(localStorage.getItem(paymentKey) || "null") || {};
        } catch (error) {
            console.error("Could not read saved payment details.", error);
            return {};
        }
    }

    function updateUserSession(nextUser) {
        if (!nextUser) return;
        const currentUser = getUser() || {};
        const mergedUser = Object.assign({}, currentUser, nextUser);
        localStorage.setItem(sessionKey, JSON.stringify(mergedUser));

        try {
            const accounts = JSON.parse(localStorage.getItem(accountsKey) || "[]");
            if (Array.isArray(accounts)) {
                const accountIndex = accounts.findIndex(function (account) {
                    return account.email === currentUser.email || account.email === mergedUser.email;
                });
                if (accountIndex >= 0) {
                    accounts[accountIndex] = Object.assign({}, accounts[accountIndex], {
                        email: mergedUser.email,
                        name: mergedUser.name,
                        firstName: mergedUser.firstName,
                        lastName: mergedUser.lastName,
                        address: mergedUser.address,
                        addressDetails: mergedUser.addressDetails || {}
                    });
                    localStorage.setItem(accountsKey, JSON.stringify(accounts));
                }
            }
        } catch (error) {
            console.error("Could not sync account details.", error);
        }
    }

    function populateAccountDetails() {
        const user = getUser();
        if (!user) return;

        const firstNameField = document.getElementById("first-name");
        const lastNameField = document.getElementById("last-name");
        const emailField = document.getElementById("email");
        const addressDetails = user.addressDetails || {};
        const houseStreetField = document.getElementById("house-street");
        const unitBuildingField = document.getElementById("unit-building");
        const barangayCityZipField = document.getElementById("barangay-city-zip");
        const contactNumberField = document.getElementById("contact-number");

        if (firstNameField) {
            firstNameField.value = user.firstName || user.name?.split(/\s+/)[0] || "";
        }
        if (lastNameField) {
            lastNameField.value = user.lastName || (user.name || "").replace(/^\s*[^\s]+\s*/, "") || "";
        }
        if (emailField) {
            emailField.value = user.email || "";
        }
        if (houseStreetField) houseStreetField.value = addressDetails.houseStreet || user.address || "";
        if (unitBuildingField) unitBuildingField.value = addressDetails.unitBuilding || "";
        if (barangayCityZipField) barangayCityZipField.value = addressDetails.barangayCityZip || "";
        if (contactNumberField) contactNumberField.value = addressDetails.contactNumber || "";
    }

    function populatePaymentDetails() {
        const payment = getPayment();
        const methodField = document.getElementById("payment-method");
        const cardholderField = document.getElementById("cardholder-name");
        const cardNumberField = document.getElementById("card-number");
        const expiryField = document.getElementById("expiration-date");
        const cvvField = document.getElementById("cvv");

        if (methodField) methodField.value = payment.method || "";
        if (cardholderField) cardholderField.value = payment.cardholderName || getUser()?.name || "";
        if (cardNumberField) cardNumberField.value = payment.cardNumber || "";
        if (expiryField) expiryField.value = payment.expirationDate || "";
        if (cvvField) cvvField.value = payment.cvv || "";
    }

    function showMessage() {
        alert("Saved Successfully!");
    }

    function saveAccountDetails() {
        const user = getUser();
        if (!user) return false;

        const firstName = (document.getElementById("first-name")?.value || "").trim();
        const lastName = (document.getElementById("last-name")?.value || "").trim();
        const email = (document.getElementById("email")?.value || "").trim();

        if (firstName && lastName && email) {
            const nextUser = {
                ...user,
                firstName: firstName,
                lastName: lastName,
                name: firstName + " " + lastName,
                email: email
            };
            updateUserSession(nextUser);
            return true;
        }
        return false;
    }

    function saveAddressDetails() {
        const user = getUser();
        if (!user) return false;

        const addressDetails = {
            houseStreet: (document.getElementById("house-street")?.value || "").trim(),
            unitBuilding: (document.getElementById("unit-building")?.value || "").trim(),
            barangayCityZip: (document.getElementById("barangay-city-zip")?.value || "").trim(),
            contactNumber: (document.getElementById("contact-number")?.value || "").trim()
        };
        if (!addressDetails.houseStreet || !addressDetails.barangayCityZip || !addressDetails.contactNumber) return false;

        const address = [
            addressDetails.houseStreet,
            addressDetails.unitBuilding,
            addressDetails.barangayCityZip,
            addressDetails.contactNumber
        ].filter(Boolean).join(", ");

        updateUserSession({
            ...user,
            address: address,
            addressDetails: addressDetails
        });
        return true;
    }

    function savePaymentDetails() {
        const payment = {
            method: document.getElementById("payment-method")?.value || "",
            cardholderName: (document.getElementById("cardholder-name")?.value || "").trim(),
            cardNumber: (document.getElementById("card-number")?.value || "").replace(/\s+/g, ""),
            expirationDate: (document.getElementById("expiration-date")?.value || "").trim(),
            cvv: (document.getElementById("cvv")?.value || "").trim()
        };

        if (!payment.method || !payment.cardholderName || !payment.cardNumber || !payment.expirationDate || !payment.cvv) {
            return false;
        }

        if (!/^\d{15,19}$/.test(payment.cardNumber)) {
            return false;
        }

        if (!/^(0[1-9]|1[0-2])\/?\d{2,4}$/.test(payment.expirationDate)) {
            return false;
        }

        if (!/^\d{3,4}$/.test(payment.cvv)) {
            return false;
        }

        localStorage.setItem(paymentKey, JSON.stringify(payment));
        return true;
    }

    document.addEventListener("DOMContentLoaded", function () {
        populateAccountDetails();
        populatePaymentDetails();

        const accountSaveButton = document.getElementById("save-account-details");
        if (accountSaveButton) {
            accountSaveButton.addEventListener("click", function () {
                if (saveAccountDetails()) {
                    showMessage();
                } else {
                    alert("Please complete all required account fields.");
                }
            });
        }

        const addressSaveButton = document.getElementById("save-address-details");
        if (addressSaveButton) {
            addressSaveButton.addEventListener("click", function () {
                if (saveAddressDetails()) {
                    showMessage();
                } else {
                    alert("Please enter a valid address.");
                }
            });
        }

        const paymentSaveButton = document.getElementById("save-payment-details");
        if (paymentSaveButton) {
            paymentSaveButton.addEventListener("click", function () {
                if (savePaymentDetails()) {
                    showMessage();
                } else {
                    alert("Please enter valid payment details.");
                }
            });
        }
    });

    window.showMessage = showMessage;
})();