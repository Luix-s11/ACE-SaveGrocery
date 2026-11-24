(function () {
    if (document.body.dataset.requiresAccount === "true" && (!window.ACESaveAuth || !window.ACESaveAuth.isAuthenticated())) {
        return;
    }

    const products = [
        { id: "milk", name: "Fresh Whole Milk", category: "Dairies", price: 89, spec: "1 L carton | 3.25% milk fat", description: "Pasteurized whole milk. Keep refrigerated.", image: "images/milk.jpg" },
        { id: "cheese", name: "Cheddar Cheese", category: "Dairies", price: 75, spec: "Cheddar-style cheese | Keep chilled", description: "Firm, savory cheese for sandwiches, snacks, or cooking.", image: "images/Cheese.jpg" },
        { id: "small-cheese", name: "Cheese Portions", category: "Dairies", price: 55, spec: "Small cheese portions | Keep chilled", description: "Convenient cheese portions for snacks and meals.", image: "images/SmallCheese.jpg" },
        { id: "butter", name: "Dairy Butter", category: "Dairies", price: 95, spec: "Chilled dairy product | Store refrigerated", description: "Butter for spreading, baking, and everyday cooking.", image: "images/Butter.jpg" },
        { id: "margarine", name: "Classic Margarine", category: "Dairies", price: 55, spec: "Margarine tub | Keep refrigerated", description: "Everyday margarine for spreading and cooking.", image: "images/Margarine.jpg" },
        { id: "yogurt", name: "Yogurt", category: "Dairies", price: 35, spec: "Ready-to-eat yogurt | Keep refrigerated", description: "Creamy yogurt pictured with fresh berries.", image: "images/YoGurt.jpg" },
        { id: "condensed-milk", name: "Sweetened Condensed Milk", category: "Dairies", price: 48, spec: "Canned milk | 377 g", description: "Sweetened condensed milk for desserts and drinks.", image: "images/Condensed.jpg" },
        { id: "evaporated-milk", name: "Evaporated Creamer", category: "Dairies", price: 38, spec: "Canned evaporated creamer | 360 mL", description: "Evaporated creamer for coffee, desserts, and cooking.", image: "images/Evap.jpg" },
        { id: "whipped-cream", name: "Whipped Cream", category: "Dairies", price: 120, spec: "Whipped cream | Keep chilled", description: "Creamy topping for pies, cakes, and other desserts.", image: "images/Whip Cream.jpg" },
        { id: "chocolate-cake", name: "Chocolate Layer Cake", category: "Pastries", price: 650, spec: "Whole cake | Chocolate layers", description: "Rich chocolate cake with layered filling and chocolate topping.", image: "images/ChocolateCake.jpg" },
        { id: "assorted-doughnuts", name: "Assorted Glazed Doughnuts", category: "Pastries", price: 150, spec: "Assorted glazed doughnuts", description: "A colorful assortment of glazed and topped doughnuts.", image: "images/Assorted Bagels.jpg" },
        { id: "bread", name: "Sliced Bread", category: "Pastries", price: 55, spec: "Sliced loaf | Keep sealed", description: "Soft sliced bread for toast and sandwiches.", image: "images/Bread.jpg" },
        { id: "croissants", name: "Butter Croissants", category: "Pastries", price: 90, spec: "Assorted croissants", description: "Flaky, golden pastries for breakfast or snacks.", image: "images/Croissant.jpg" },
        { id: "fruit-bread", name: "Fruit Bread", category: "Pastries", price: 95, spec: "Fruit-topped pastries", description: "Sweet pastries topped with fruit.", image: "images/Fruit Bread.jpg" },
        { id: "fruit-tart", name: "Fruit Tart", category: "Pastries", price: 95, spec: "Fruit tart | Single serving", description: "A crisp tart filled with cream and fresh fruit.", image: "images/Fruit tart.jpg" },
        { id: "muffins", name: "Blueberry Muffins", category: "Pastries", price: 80, spec: "Assorted muffins", description: "Soft muffins with blueberries.", image: "images/Muffins.jpg" },
        { id: "assorted-tart", name: "Assorted Tart", category: "Pastries", price: 85, spec: "Sweet tart | Single serving", description: "A buttery pastry shell filled with a sweet topping.", image: "images/Tart.jpg" },
        { id: "apple-pie", name: "Apple Pie", category: "Pastries", price: 220, spec: "Whole pie | Apple filling", description: "Classic baked pie with apple filling and a flaky crust.", image: "images/Apple Pie.jpg" },
        { id: "peach-mango-pie", name: "Peach Mango Pie", category: "Pastries", price: 35, spec: "Single pie | Peach and mango filling", description: "Golden pastry filled with sweet peach and mango.", image: "images/Peach Mango Pie.jpg" },
        { id: "macarons", name: "Assorted Macarons", category: "Pastries", price: 180, spec: "Assorted flavors | 6-piece box", description: "Colorful sandwich cookies with assorted fillings.", image: "images/Macarons.jpg" },
        { id: "fish", name: "Fresh Whole Fish", category: "Seafood", price: 220, spec: "Whole fish | Price per kg", description: "Fresh whole fish. Sold by weight; final price may vary.", image: "images/Fish.png" },
        { id: "butterflied-fish", name: "Butterflied Fish", category: "Seafood", price: 180, spec: "Fresh fish | Keep chilled", description: "Cleaned, butterflied fish ready for cooking.", image: "images/Fisha.jpg" },
        { id: "tilapia", name: "Fresh Tilapia", category: "Seafood", price: 190, spec: "Whole fish | Keep chilled", description: "Fresh whole tilapia. Cook thoroughly before serving.", image: "images/Fishh.jpg" },
        { id: "tuna-steaks", name: "Tuna Steaks", category: "Seafood", price: 350, spec: "Fresh tuna | Keep chilled", description: "Tuna steaks for grilling or pan-searing. Keep chilled and cook before eating.", image: "images/Fisher.jpg" },
        { id: "salmon", name: "Salmon", category: "Seafood", price: 420, spec: "Fresh salmon | Keep chilled", description: "Salmon portions for roasting, grilling, or pan-searing.", image: "images/Salmon.jpg" },
        { id: "shrimp", name: "Fresh Shrimp", category: "Seafood", price: 195, spec: "500 g pack | Keep chilled", description: "Shrimp pictured cooked; product is sold fresh and should be cooked before eating.", image: "images/Shrimp.jpg" },
        { id: "shell-on-shrimp", name: "Shell-On Shrimp", category: "Seafood", price: 210, spec: "Shrimp | Keep chilled", description: "Shell-on shrimp for cooking. Keep chilled and cook thoroughly.", image: "images/Skin Shrimp.jpg" },
        { id: "crabsticks", name: "Crab Sticks", category: "Seafood", price: 85, spec: "Chilled seafood sticks | Keep refrigerated", description: "Surimi-style crab sticks for salads, sushi, or snacks.", image: "images/Crabstick.jpg" },
        { id: "clams", name: "Fresh Clams", category: "Seafood", price: 160, spec: "Shellfish | Keep chilled", description: "Fresh clams for soups and seafood dishes. Cook thoroughly before eating.", image: "images/Clam.jpg" },
        { id: "mini-octopus", name: "Mini Octopus", category: "Seafood", price: 280, spec: "Octopus | Keep chilled", description: "Mini octopus for seafood dishes. Cook thoroughly before eating.", image: "images/Mini octopus.jpg" },
        { id: "king-crab", name: "King Crab", category: "Seafood", price: 950, spec: "Whole crab | Price per kg", description: "King crab pictured cooked. Sold by weight; final price may vary.", image: "images/King Crab.jpg" },
        { id: "siomai", name: "Frozen Pork Siomai", category: "Frozen Foods", price: 145, spec: "Frozen dumplings | Keep frozen", description: "Pork siomai in a frozen multipack. Cook thoroughly before serving.", image: "images/Siomai.png" },
        { id: "hashbrowns", name: "Frozen Hash Browns", category: "Frozen Foods", price: 115, spec: "Frozen potato patties | Keep frozen", description: "Ready-to-cook potato hash browns. Cook until hot and crisp.", image: "images/Hashbrowns.jpg" },
        { id: "chicken-nuggets", name: "Frozen Chicken Nuggets", category: "Frozen Foods", price: 160, spec: "Frozen chicken nuggets | Keep frozen", description: "Breaded chicken nuggets. Cook thoroughly before serving.", image: "images/Nuggets.jpg" },
        { id: "frozen-pizza", name: "Frozen Pizza", category: "Frozen Foods", price: 220, spec: "Frozen pizza | Keep frozen", description: "Ready-to-bake pizza. Follow the package cooking instructions.", image: "images/Pizza.jpg" },
        { id: "toast-fries", name: "Frozen Toast Fries", category: "Frozen Foods", price: 95, spec: "Frozen potato fries | Keep frozen", description: "Crispy potato fries. Cook from frozen according to package directions.", image: "images/Toast Fries.jpg" },
        { id: "mixed-veggies", name: "Frozen Mixed Vegetables", category: "Frozen Foods", price: 95, spec: "Mixed vegetable pack | Keep frozen", description: "A colorful mix of diced vegetables for quick meals.", image: "images/Mixed Veggies.jpg" },
        { id: "icecream", name: "Strawberry Ice Cream", category: "Frozen Foods", price: 185, spec: "Strawberry flavor | 1 L tub | Keep frozen", description: "Creamy strawberry ice cream with fruit pieces.", image: "images/Strawberry IceCream.jpg" },
        { id: "chips", name: "Lay's Classic Potato Chips", category: "Snacks", price: 120, spec: "8 oz (226 g) bag", description: "Classic salted potato chips in a share-size bag.", image: "images/Lays Classic Chip.jpg" },
        { id: "crackers", name: "Assorted Crackers", category: "Snacks", price: 65, spec: "Assorted cracker selection", description: "A selection of crisp crackers for snacks and cheese boards.", image: "images/Crackers.jpg" },
        { id: "cream-crackers", name: "Cream Crackers", category: "Snacks", price: 35, spec: "Pack of cream crackers", description: "Crisp cream crackers for snacking or serving with spreads.", image: "images/Crackerss.jpg" },
        { id: "cookies", name: "Assorted Cookies", category: "Snacks", price: 95, spec: "Assorted cookie selection", description: "A mix of classic cookies in several flavors.", image: "images/Assorted Cookies.jpg" },
        { id: "chocolates", name: "Assorted Chocolates", category: "Snacks", price: 180, spec: "Assorted chocolate bars", description: "An assortment of individually wrapped chocolate treats.", image: "images/AssortedChocolates.jpg" },
        { id: "candies", name: "Assorted Candies", category: "Snacks", price: 75, spec: "Assorted gummy candy", description: "Colorful assorted sweets for sharing.", image: "images/Assorted Candies.jpg" },
        { id: "gummies", name: "Gummy Candies", category: "Snacks", price: 65, spec: "Assorted gummy candy", description: "Colorful chewy gummies in assorted shapes.", image: "images/Gummies.jpg" },
        { id: "peanuts", name: "Peanuts", category: "Snacks", price: 80, spec: "Pack of peanuts", description: "Peanuts for snacking or adding to recipes.", image: "images/Peanuts.jpg" },
        { id: "popcorn", name: "Popcorn", category: "Snacks", price: 55, spec: "Popcorn snack", description: "A light, crunchy snack for movie nights and sharing.", image: "images/Popcorn.jpg" },
        { id: "pretzels", name: "Pretzels", category: "Snacks", price: 75, spec: "Pack of pretzels", description: "Crunchy pretzels for an easy savory snack.", image: "images/Pretzels.jpg" },
        { id: "juice", name: "Orange Juice", category: "Beverages", price: 68, spec: "Chilled fruit juice", description: "Bright citrus juice. Serve chilled.", image: "images/Juice.jpg" },
        { id: "coca-cola", name: "Coca-Cola Classic", category: "Beverages", price: 35, spec: "Soft drink | Bottle", description: "Classic cola soft drink. Serve chilled.", image: "images/Coke.jpg" },
        { id: "iced-tea", name: "Bottled Iced Tea", category: "Beverages", price: 40, spec: "Assorted iced tea bottles", description: "Refreshing bottled iced tea. Serve chilled.", image: "images/Iced Tea.jpg" },
        { id: "soda", name: "Lime Soda", category: "Beverages", price: 35, spec: "Sparkling lime drink", description: "Refreshing fizzy drink with a lime garnish.", image: "images/Soda.jpg" },
        { id: "energy-drink", name: "Energy Drink", category: "Beverages", price: 45, spec: "250 mL bottle", description: "Carbonated energy drink. Check the label for ingredients and caffeine information.", image: "images/Energy Drink.jpg" },
        { id: "water", name: "Bottled Water", category: "Beverages", price: 20, spec: "Drinking water | Bottle", description: "Bottled drinking water for everyday hydration.", image: "images/Water.jpg" },
        { id: "oranges", name: "Fresh Oranges", category: "Beverages", price: 75, spec: "Fresh produce | Pack", description: "Juicy oranges for snacks, desserts, or fresh juice.", image: "images/orange.jpg" },
        { id: "beef", name: "Beef Sirloin", category: "Meats and Butcher", price: 320, spec: "Fresh beef | Price per kg", description: "Raw beef cuts for grilling or pan-searing. Keep chilled and cook thoroughly.", image: "images/Beef Meat.png" },
        { id: "beef-steak", name: "Beef Steak", category: "Meats and Butcher", price: 340, spec: "Fresh beef | Price per kg", description: "Raw beef steak for grilling or pan-searing. Keep chilled and cook thoroughly.", image: "images/Beeff.jpg" },
        { id: "chicken", name: "Whole Chicken", category: "Meats and Butcher", price: 185, spec: "Fresh whole chicken | Price per kg", description: "Raw whole chicken. Keep chilled and cook thoroughly.", image: "images/Chicken Meat.jpg" },
        { id: "chicken-wings", name: "Fresh Chicken Wings", category: "Meats and Butcher", price: 210, spec: "Fresh chicken wings | Keep chilled", description: "Raw chicken wings. Keep chilled and cook thoroughly.", image: "images/ChickenWing.jpg" },
        { id: "pork", name: "Fresh Pork Cuts", category: "Meats and Butcher", price: 230, spec: "Fresh pork | Price per kg", description: "Raw pork cuts for everyday cooking. Keep chilled and cook thoroughly.", image: "images/Pork Meat.jpg" },
        { id: "pork-chops", name: "Pork Chops", category: "Meats and Butcher", price: 240, spec: "Fresh pork chops | Keep chilled", description: "Raw pork chops for grilling or pan-searing. Keep chilled and cook thoroughly.", image: "images/Meat.jpg" },
        { id: "pork-fat", name: "Pork Fat", category: "Meats and Butcher", price: 120, spec: "Fresh pork fat | Keep chilled", description: "Pork fat for cooking. Keep chilled and cook thoroughly.", image: "images/PorkFat.jpg" },
        { id: "ham", name: "Sliced Ham", category: "Meats and Butcher", price: 150, spec: "Sliced ham | Keep refrigerated", description: "Sliced ham for sandwiches and breakfast.", image: "images/Ham.jpg" },
        { id: "sausage", name: "Sausages", category: "Meats and Butcher", price: 125, spec: "Pack of sausages | Keep chilled", description: "Sausages for breakfast or quick meals. Cook thoroughly.", image: "images/sausage.jpg" },
        { id: "bacon", name: "Thin-Cut Bacon", category: "Meats and Butcher", price: 180, spec: "Thin-cut bacon | Keep refrigerated", description: "Thin-cut bacon for breakfast and cooking. Cook thoroughly.", image: "images/ThinCutBacon.jpg" },
        { id: "rice", name: "Rice", category: "Grain Products", price: 350, spec: "5 kg bag", description: "Long-grain rice in a family-size bag.", image: "images/Rice.jpg" },
        { id: "rice-grains", name: "Rice Grains", category: "Grain Products", price: 320, spec: "Bag of rice grains", description: "Rice grains for everyday cooking.", image: "images/RiceGrains.jpg" },
        { id: "flour", name: "Plain Flour", category: "Grain Products", price: 780, spec: "12.5 kg bag", description: "Plain wheat flour for baking and cooking.", image: "images/Flour.jpg" },
        { id: "oats", name: "Rolled Oats", category: "Grain Products", price: 110, spec: "Rolled oats | Pack", description: "Rolled oats for breakfast, baking, and cooking.", image: "images/Flakes.jpg" },
        { id: "macaroni", name: "Macaroni", category: "Grain Products", price: 65, spec: "Dry macaroni pasta | Pack", description: "Elbow macaroni for pasta dishes and soups.", image: "images/Macaroni.jpg" },
        { id: "raw-pasta", name: "Dry Pasta", category: "Grain Products", price: 75, spec: "Dry pasta | Pack", description: "Dry pasta ready to cook for your favorite meals.", image: "images/RawPasta.jpg" },
        { id: "whole-grain", name: "Whole Grains", category: "Grain Products", price: 110, spec: "Whole-grain selection | Sold by weight", description: "A selection of whole grains for cooking and baking.", image: "images/Whole Grain.jpg" },
        { id: "tomatoes", name: "Fresh Tomatoes", category: "Vegetables", price: 48, spec: "Fresh produce | 500 g pack", description: "Ripe tomatoes for salads, sauces, and cooking.", image: "images/Tomato.jpg" },
        { id: "carrots", name: "Baby Carrots", category: "Vegetables", price: 65, spec: "908 g pack", description: "Washed baby carrots, ready to cook or snack on.", image: "images/carrots.jpg" },
        { id: "cabbage", name: "Green Cabbage", category: "Vegetables", price: 65, spec: "Fresh whole head", description: "Crisp green cabbage for salads, stir-fries, and soups.", image: "images/Cabbage.jpg" },
        { id: "broccoli", name: "Fresh Broccoli", category: "Vegetables", price: 95, spec: "Fresh produce | Sold per head", description: "Fresh broccoli florets and stem for cooking.", image: "images/Broccolli.jpg" },
        { id: "cucumbers", name: "Fresh Cucumbers", category: "Vegetables", price: 55, spec: "Fresh produce | Pack", description: "Crisp cucumbers for salads, sandwiches, and snacks.", image: "images/cucumbers.jpg" },
        { id: "bell-peppers", name: "Red Bell Peppers", category: "Vegetables", price: 75, spec: "Fresh produce | Pack", description: "Sweet red bell peppers for salads, stir-fries, and roasting.", image: "images/bell pepper.jpg" },
        { id: "cauliflower", name: "Fresh Cauliflower", category: "Vegetables", price: 95, spec: "Fresh produce | Whole head", description: "Fresh cauliflower for roasting, steaming, and everyday cooking.", image: "images/Cauliflower.jpg" },
        { id: "ginger", name: "Fresh Ginger", category: "Vegetables", price: 45, spec: "Fresh produce | Pack", description: "Aromatic fresh ginger for seasoning, tea, and cooking.", image: "images/Ginger.jpg" },
        { id: "sweet-potatoes", name: "Sweet Potatoes", category: "Vegetables", price: 65, spec: "Fresh produce | Pack", description: "Sweet potatoes for roasting, boiling, or mashing.", image: "images/Kamote.jpg" },
        { id: "lettuce", name: "Fresh Lettuce", category: "Vegetables", price: 70, spec: "Fresh produce | Head", description: "Crisp lettuce leaves for salads, wraps, and sandwiches.", image: "images/Lettuce.jpg" },
        { id: "onions", name: "Fresh Onions", category: "Vegetables", price: 55, spec: "Fresh produce | Pack", description: "Everyday onions for seasoning and cooking.", image: "images/Onion.jpg" },
        { id: "pechay", name: "Fresh Pechay", category: "Vegetables", price: 40, spec: "Fresh produce | Bunch", description: "Fresh pechay for soups, stir-fries, and vegetable dishes.", image: "images/Pechay.jpg" },
        { id: "potatoes", name: "Fresh Potatoes", category: "Vegetables", price: 65, spec: "Fresh produce | Pack", description: "Versatile potatoes for roasting, frying, and cooking.", image: "images/Potatos.jpg" },
        { id: "scallions", name: "Fresh Scallions", category: "Vegetables", price: 35, spec: "Fresh produce | Bunch", description: "Fresh scallions for garnishes, salads, and cooking.", image: "images/Scallions.jpg" },
        { id: "spinach", name: "Fresh Spinach", category: "Vegetables", price: 55, spec: "Fresh produce | Bunch", description: "Tender spinach leaves for salads, soups, and sautés.", image: "images/Spinach.jpg" },
        { id: "whole-carrots", name: "Whole Carrots", category: "Vegetables", price: 60, spec: "Fresh produce | Pack", description: "Fresh whole carrots for snacks, sides, and cooking.", image: "images/WholeCarrots.jpg" }
    ];
    const cartKeyPrefix = "aceSaveCart:";
    const lastOrderKeyPrefix = "aceSaveLastOrder:";
    const productById = new Map(products.map(function (product) {
        return [product.id, product];
    }));
    let cartNotificationTimeout;
    let selectedCategory = "All";

    function showMessage(message, isError) {
        const messageBox = document.getElementById("store-message");
        if (messageBox) {
            messageBox.textContent = message;
            messageBox.classList.toggle("error", Boolean(isError));
            messageBox.classList.remove("cart-notification");
        }
    }

    function showCartNotification() {
        const messageBox = document.getElementById("store-message");
        if (!messageBox) return;

        window.clearTimeout(cartNotificationTimeout);
        messageBox.textContent = "Added to your Cart!";
        messageBox.classList.remove("error");
        messageBox.classList.add("cart-notification");
        cartNotificationTimeout = window.setTimeout(function () {
            messageBox.classList.remove("cart-notification");
            messageBox.textContent = "";
        }, 2200);
    }

    function getAccountStorageKey(prefix) {
        const account = window.ACESaveAuth && window.ACESaveAuth.getUser();
        if (!account) return null;
        return prefix + encodeURIComponent(account.email.toLowerCase());
    }

    function readCart() {
        const cartKey = getAccountStorageKey(cartKeyPrefix);
        if (!cartKey) return [];
        const savedCart = localStorage.getItem(cartKey);
        if (!savedCart) return [];
        try {
            const parsedCart = JSON.parse(savedCart);
            if (!Array.isArray(parsedCart)) throw new Error("Cart data is not a list.");
            return parsedCart.reduce(function (validItems, item) {
                if (!item || !productById.has(item.id) || !Number.isInteger(item.quantity) || item.quantity < 1) {
                    return validItems;
                }
                const product = productById.get(item.id);
                validItems.push({ id: product.id, quantity: item.quantity });
                return validItems;
            }, []);
        } catch (error) {
            console.error("Could not read the saved cart.", error);
            showMessage("Your saved cart could not be read. Clear your browser's ACE!Save cart data and try again.", true);
            return [];
        }
    }

    function saveCart(cart) {
        const cartKey = getAccountStorageKey(cartKeyPrefix);
        if (!cartKey) {
            showMessage("Sign in to use your cart.", true);
            return false;
        }
        try {
            localStorage.setItem(cartKey, JSON.stringify(cart));
            updateCartCount(cart);
            return true;
        } catch (error) {
            console.error("Could not save the cart.", error);
            showMessage("Your cart could not be saved in this browser. Check your browser storage settings.", true);
            return false;
        }
    }

    function updateCartCount(cart) {
        const count = (!window.ACESaveAuth || !window.ACESaveAuth.isAuthenticated() ? [] : cart || readCart()).reduce(function (total, item) {
            return total + item.quantity;
        }, 0);
        document.querySelectorAll("#cart-count").forEach(function (badge) {
            badge.textContent = String(count);
        });
    }

    function formatPrice(price) {
        return "₱" + price.toFixed(2);
    }

    function renderProducts() {
        const container = document.getElementById("product-categories");
        if (!container) return;
        const categories = Array.from(new Set(products.map(function (product) {
            return product.category;
        })));
        container.replaceChildren();

        const sidebar = document.createElement("aside");
        sidebar.className = "category-sidebar";
        const categoryHeading = document.createElement("h2");
        categoryHeading.textContent = "Category";
        const categoryNavigation = document.createElement("nav");
        categoryNavigation.className = "category-navigation";
        categoryNavigation.setAttribute("aria-label", "Product categories");

        function addCategoryButton(category, label) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "category-button";
            button.dataset.category = category;
            button.textContent = label;
            button.setAttribute("aria-pressed", String(selectedCategory === category));
            button.addEventListener("click", function () {
                selectedCategory = category;
                updateProductView();
            });
            categoryNavigation.appendChild(button);
        }

        addCategoryButton("All", "All products");
        categories.forEach(function (category) {
            addCategoryButton(category, category === "Dairies" ? "Dairy" : category);
        });
        sidebar.append(categoryHeading, categoryNavigation);

        const results = document.createElement("section");
        results.className = "category-results";
        results.setAttribute("aria-labelledby", "product-results-title");
        const title = document.createElement("h2");
        title.id = "product-results-title";
        title.textContent = "Products";
        const description = document.createElement("p");
        description.className = "category-description";
        description.id = "category-description";
        const productList = document.createElement("div");
        productList.className = "product-container";
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "product-empty-state";
        emptyMessage.hidden = true;
        emptyMessage.textContent = "No products match your selection.";

        products.forEach(function (product) {
            const card = document.createElement("article");
            card.className = "product-card";
            card.dataset.category = product.category;
            card.dataset.searchText = [
                product.name,
                product.category,
                product.spec,
                product.description
            ].join(" ").toLowerCase();
            const visual = document.createElement("div");
            visual.className = "product-visual";
            if (product.image) {
                const image = document.createElement("img");
                image.src = product.image;
                image.alt = product.name;
                visual.appendChild(image);
            }
            const info = document.createElement("div");
            info.className = "product-info";
            const name = document.createElement("h3");
            name.textContent = product.name;
            const spec = document.createElement("p");
            spec.className = "product-spec";
            spec.textContent = product.spec;
            const productDescription = document.createElement("p");
            productDescription.className = "product-description";
            productDescription.textContent = product.description;
            const price = document.createElement("p");
            price.className = "product-price";
            price.textContent = formatPrice(product.price);
            const addButton = document.createElement("button");
            addButton.type = "button";
            addButton.className = "add-to-cart-button";
            addButton.dataset.addToCart = product.id;
            addButton.textContent = "Add to cart";
            info.append(name, spec, productDescription, price, addButton);
            card.append(visual, info);
            productList.appendChild(card);
        });

        results.append(title, description, productList, emptyMessage);
        container.append(sidebar, results);
        updateProductView();
    }

    function updateProductView() {
        const container = document.getElementById("product-categories");
        if (!container) return;
        const input = document.getElementById("shop-search-input");
        const query = input ? input.value.trim().toLowerCase() : "";
        const searchTerms = query.match(/[a-z0-9]+/g) || [];
        let matchCount = 0;

        container.querySelectorAll(".category-button").forEach(function (button) {
            button.setAttribute("aria-pressed", String(button.dataset.category === selectedCategory));
        });
        container.querySelectorAll(".product-card").forEach(function (card) {
            const matchesCategory = selectedCategory === "All" || card.dataset.category === selectedCategory;
            const searchWords = card.dataset.searchText.match(/[a-z0-9]+/g) || [];
            const matchesSearch = searchTerms.length === 0
                ? query.length === 0
                : searchTerms.every(function (term) {
                    return searchWords.some(function (word) {
                        return word.startsWith(term);
                    });
                });
            card.hidden = !matchesCategory || !matchesSearch;
            if (!card.hidden) matchCount += 1;
        });

        const description = document.getElementById("category-description");
        if (description) {
            const categoryButton = container.querySelector('.category-button[data-category="' + selectedCategory + '"]');
            const categoryLabel = categoryButton ? categoryButton.textContent : "All products";
            description.textContent = selectedCategory === "All"
                ? "Browse our full range of everyday essentials."
                : "Showing " + categoryLabel + " products.";
        }

        const emptyMessage = container.querySelector(".product-empty-state");
        if (emptyMessage) emptyMessage.hidden = matchCount > 0;
        const status = document.getElementById("shop-search-status");
        if (status && query) {
            status.textContent = matchCount === 1
                ? "1 product found"
                : matchCount + " products found";
        }
    }

    function setupSearch() {
        const input = document.getElementById("shop-search-input");
        const clearButton = document.getElementById("shop-search-clear");
        const status = document.getElementById("shop-search-status");
        const container = document.getElementById("product-categories");
        if (!input || !clearButton || !status || !container) return;

        input.addEventListener("input", function () {
            const query = input.value.trim().toLowerCase();
            clearButton.hidden = query.length === 0;
            if (query) {
                selectedCategory = "All";
            }
            if (!query) status.textContent = "";
            updateProductView();
        });
        clearButton.addEventListener("click", function () {
            input.value = "";
            clearButton.hidden = true;
            status.textContent = "";
            updateProductView();
            input.focus();
        });
    }

    function renderCart() {
        const list = document.getElementById("cart-items");
        if (!list) return;
        const cart = readCart();
        list.replaceChildren();
        const total = cart.reduce(function (sum, item) {
            return sum + productById.get(item.id).price * item.quantity;
        }, 0);
        const totalElement = document.getElementById("cart-total");
        const emptyMessage = document.getElementById("empty-cart");
        const checkoutStart = document.getElementById("checkout-start");
        const clearButton = document.getElementById("clear-cart");
        if (totalElement) totalElement.textContent = formatPrice(total);
        if (emptyMessage) emptyMessage.hidden = cart.length > 0;
        if (checkoutStart) checkoutStart.disabled = cart.length === 0;
        if (clearButton) clearButton.hidden = cart.length === 0;

        cart.forEach(function (item) {
            const product = productById.get(item.id);
            const row = document.createElement("article");
            row.className = "cart-item";
            const details = document.createElement("div");
            details.className = "cart-item-details";
            const name = document.createElement("h3");
            name.textContent = product.name;
            const spec = document.createElement("p");
            spec.className = "cart-item-spec";
            spec.textContent = product.spec;
            const unitPrice = document.createElement("p");
            unitPrice.textContent = formatPrice(product.price) + (product.spec.toLowerCase().includes("per kg") ? " / kg" : " / item");
            details.append(name, spec, unitPrice);
            const quantity = document.createElement("label");
            quantity.className = "quantity-control";
            quantity.textContent = "Qty";
            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.min = "1";
            quantityInput.max = "99";
            quantityInput.value = String(item.quantity);
            quantityInput.dataset.quantityFor = item.id;
            quantityInput.setAttribute("aria-label", "Quantity for " + product.name);
            quantity.appendChild(quantityInput);
            const lineTotal = document.createElement("strong");
            lineTotal.className = "line-total";
            lineTotal.textContent = formatPrice(product.price * item.quantity);
            const remove = document.createElement("button");
            remove.type = "button";
            remove.className = "remove-item-button";
            remove.dataset.removeFromCart = item.id;
            remove.textContent = "Remove";
            row.append(details, quantity, lineTotal, remove);
            list.appendChild(row);
        });
        updateCartCount(cart);
    }

    function createTrackingNumber() {
        const randomValues = new Uint32Array(1);
        window.crypto.getRandomValues(randomValues);
        return "ACE-" + Date.now().toString(36).toUpperCase() + "-" + randomValues[0].toString(36).toUpperCase();
    }

    function displayOrder(order, message) {
        const confirmation = document.getElementById("order-confirmation");
        if (!confirmation) return;
        confirmation.hidden = false;
        const statusMessage = order.status === "received"
            ? "This order has been marked as received."
            : order.status === "cancelled"
                ? "This order has been cancelled."
                : message;
        document.getElementById("order-message").textContent = statusMessage;
        document.getElementById("tracking-number").textContent = order.trackingNumber;
        document.getElementById("estimated-delivery").textContent = order.estimatedDelivery;
        document.getElementById("tracking-recipient").textContent = order.customer.name;
        document.getElementById("tracking-address").textContent = order.customer.address;
    }

    function renderOrderNotification() {
        const notification = document.getElementById("latest-order-notification");
        const emptyMessage = document.getElementById("notification-empty");
        if (!notification || !emptyMessage) return;

        const orderKey = getAccountStorageKey(lastOrderKeyPrefix);
        let order = null;
        try {
            const savedOrder = orderKey ? localStorage.getItem(orderKey) : null;
            order = savedOrder ? JSON.parse(savedOrder) : null;
        } catch (error) {
            console.error("Could not read the saved order notification.", error);
            emptyMessage.textContent = "Your saved order receipt could not be read. Check your browser storage and try again.";
            emptyMessage.classList.add("error");
            return;
        }

        if (!order || !order.trackingNumber || !order.customer) {
            notification.hidden = true;
            emptyMessage.hidden = false;
            return;
        }
        if (order.notificationDismissed === true) {
            notification.hidden = true;
            emptyMessage.textContent = "Your order notification has been cleared. A new order update will appear here after checkout.";
            emptyMessage.classList.remove("error");
            emptyMessage.hidden = false;
            return;
        }
        notification.hidden = false;
        emptyMessage.hidden = true;
        document.getElementById("notification-tracking-number").textContent = order.trackingNumber;
        document.getElementById("notification-estimated-delivery").textContent = order.estimatedDelivery || "Not available";
        document.getElementById("notification-recipient").textContent = order.customer.name || "Not available";
        document.getElementById("notification-address").textContent = order.customer.address || "Not available";
        const orderTotal = typeof order.total === "number"
            ? order.total
            : (order.items || []).reduce(function (total, item) {
                const product = item && productById.get(item.id);
                return total + (product && Number.isInteger(item.quantity) ? product.price * item.quantity : 0);
            }, 0);
        document.getElementById("notification-total").textContent = formatPrice(orderTotal);

        const itemList = document.getElementById("notification-order-items");
        itemList.replaceChildren();
        (Array.isArray(order.items) ? order.items : []).forEach(function (item) {
            const product = item && productById.get(item.id);
            if (!product || !Number.isInteger(item.quantity) || item.quantity < 1) return;
            const row = document.createElement("li");
            const description = document.createElement("span");
            description.textContent = product.name + " × " + item.quantity;
            const price = document.createElement("strong");
            price.textContent = formatPrice(product.price * item.quantity);
            row.append(description, price);
            itemList.appendChild(row);
        });

        const status = order.status === "received" || order.status === "cancelled"
            ? order.status
            : "processing";
        const statusLabel = status === "received" ? "Received" : status === "cancelled" ? "Cancelled" : "In progress";
        const statusElement = document.getElementById("notification-order-status");
        statusElement.textContent = statusLabel;
        statusElement.dataset.status = status;
        document.getElementById("notification-order-actions").hidden = status !== "processing";
    }

    function clearOrderNotification() {
        const notification = document.getElementById("latest-order-notification");
        const emptyMessage = document.getElementById("notification-empty");
        const actionMessage = document.getElementById("notification-action-message");
        const orderKey = getAccountStorageKey(lastOrderKeyPrefix);
        if (!notification || !emptyMessage) return;
        if (!orderKey) {
            if (actionMessage) {
                actionMessage.textContent = "Sign in to clear this order notification.";
                actionMessage.classList.add("error");
            }
            return;
        }

        try {
            const savedOrder = localStorage.getItem(orderKey);
            const order = savedOrder ? JSON.parse(savedOrder) : null;
            if (!order || !order.trackingNumber || !order.customer) {
                renderOrderNotification();
                return;
            }
            order.notificationDismissed = true;
            localStorage.setItem(orderKey, JSON.stringify(order));
            if (window.ACESaveNotifications) {
                window.ACESaveNotifications.refreshIndicator();
            }
            notification.hidden = true;
            emptyMessage.textContent = "Your order notification has been cleared. A new order update will appear here after checkout.";
            emptyMessage.classList.remove("error");
            emptyMessage.hidden = false;
        } catch (error) {
            console.error("Could not clear the order notification.", error);
            if (actionMessage) {
                actionMessage.textContent = "The notification could not be cleared. Check your browser storage and try again.";
                actionMessage.classList.add("error");
            }
        }
    }

    function updateOrderStatus(status) {
        const orderKey = getAccountStorageKey(lastOrderKeyPrefix);
        if (!orderKey) return;

        try {
            const savedOrder = localStorage.getItem(orderKey);
            if (!savedOrder) return;
            const order = JSON.parse(savedOrder);
            if (!order || order.status === "received" || order.status === "cancelled") return;
            order.status = status;
            order[status === "received" ? "receivedAt" : "cancelledAt"] = new Date().toISOString();
            localStorage.setItem(orderKey, JSON.stringify(order));
            const actionMessage = document.getElementById("notification-action-message");
            if (actionMessage) {
                actionMessage.textContent = status === "received"
                    ? "Thanks for confirming delivery."
                    : "Your order has been cancelled.";
                actionMessage.classList.remove("error");
            }
            displayOrder(order, "");
            renderOrderNotification();
        } catch (error) {
            console.error("Could not update the order status.", error);
            const actionMessage = document.getElementById("notification-action-message");
            if (actionMessage) {
                actionMessage.textContent = "Your order status could not be saved. Check your browser storage and try again.";
                actionMessage.classList.add("error");
            }
        }
    }

    function hideSavedOrder() {
        const confirmation = document.getElementById("order-confirmation");
        if (confirmation) confirmation.hidden = true;
    }

    function initializeCheckout() {
        const form = document.getElementById("checkout-form");
        const start = document.getElementById("checkout-start");
        if (!form || !start) return;
        const account = window.ACESaveAuth.getUser();
        if (account) {
            form.elements.customerName.value = account.name || "";
            form.elements.email.value = account.email || "";
            form.elements.address.value = account.address || "";
        }
        const cancel = document.getElementById("checkout-cancel");
        const clear = document.getElementById("clear-cart");
        start.addEventListener("click", function () {
            if (!window.ACESaveAuth || !window.ACESaveAuth.isAuthenticated()) {
                window.location.assign("registration-signin.html?return=order.html");
                return;
            }
            hideSavedOrder();
            form.hidden = false;
            start.hidden = true;
            form.querySelector("input").focus();
        });
        cancel.addEventListener("click", function () {
            form.reset();
            form.hidden = true;
            start.hidden = false;
        });
        clear.addEventListener("click", function () {
            if (!window.confirm("Remove all items from your cart?")) return;
            if (saveCart([])) renderCart();
        });
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            if (!window.ACESaveAuth || !window.ACESaveAuth.isAuthenticated()) {
                window.location.assign("registration-signin.html?return=order.html");
                return;
            }
            const cart = readCart();
            if (cart.length === 0) {
                showMessage("Add at least one product before placing an order.", true);
                renderCart();
                return;
            }
            const formData = new FormData(form);
            const customer = {
                name: String(formData.get("customerName")).trim(),
                email: String(formData.get("email")).trim(),
                phone: String(formData.get("phone")).trim(),
                address: String(formData.get("address")).trim(),
                instructions: String(formData.get("instructions")).trim()
            };
            const subtotal = cart.reduce(function (sum, item) {
                return sum + productById.get(item.id).price * item.quantity;
            }, 0);
            const delivery = new Date(Date.now() + 60 * 60 * 1000);
            const order = {
                trackingNumber: createTrackingNumber(),
                customer: customer,
                items: cart,
                total: subtotal,
                status: "processing",
                notificationDismissed: false,
                placedAt: new Date().toISOString(),
                estimatedDelivery: delivery.toLocaleString("en-PH", {
                    dateStyle: "medium",
                    timeStyle: "short"
                })
            };
            try {
                const orderKey = getAccountStorageKey(lastOrderKeyPrefix);
                if (!orderKey) {
                    window.location.assign("registration-signin.html?return=order.html");
                    return;
                }
                localStorage.setItem(orderKey, JSON.stringify(order));
                if (window.ACESaveNotifications) {
                    window.ACESaveNotifications.refreshIndicator();
                }
            } catch (error) {
                console.error("Could not save the order.", error);
                showMessage("Your order could not be saved in this browser. Check your browser storage settings and try again.", true);
                return;
            }
            if (!saveCart([])) return;
            renderCart();
            form.hidden = true;
            start.hidden = true;
            displayOrder(order, "Order placed successfully. Save your tracking number to check your delivery.");
            showMessage("");
            document.getElementById("order-confirmation").scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

    document.addEventListener("click", function (event) {
        const clearNotificationButton = event.target.closest("#clear-order-notification");
        if (clearNotificationButton) {
            clearOrderNotification();
            return;
        }
        const receivedButton = event.target.closest("#order-received");
        if (receivedButton) {
            updateOrderStatus("received");
            return;
        }
        const cancelOrderButton = event.target.closest("#cancel-order");
        if (cancelOrderButton) {
            if (window.confirm("Cancel this order? This cannot be undone.")) {
                updateOrderStatus("cancelled");
            }
            return;
        }
        const addButton = event.target.closest("[data-add-to-cart]");
        if (addButton) {
            const product = productById.get(addButton.dataset.addToCart);
            if (!product) return;
            if (!window.ACESaveAuth || !window.ACESaveAuth.isAuthenticated()) {
                try {
                    localStorage.setItem("aceSavePendingPage", "menu-signin.html");
                } catch (error) {
                    console.error("Could not save the requested destination.", error);
                }
                window.location.assign("registration-signin.html?return=menu-signin.html");
                return;
            }
            const cart = readCart();
            const existing = cart.find(function (item) {
                return item.id === product.id;
            });
            if (existing) existing.quantity += 1;
            else cart.push({ id: product.id, quantity: 1 });
            if (saveCart(cart)) showCartNotification();
        }
        const removeButton = event.target.closest("[data-remove-from-cart]");
        if (removeButton) {
            const cart = readCart().filter(function (item) {
                return item.id !== removeButton.dataset.removeFromCart;
            });
            if (saveCart(cart)) renderCart();
        }
    });

    document.addEventListener("change", function (event) {
        const quantityInput = event.target.closest("[data-quantity-for]");
        if (!quantityInput) return;
        const quantity = Number(quantityInput.value);
        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
            showMessage("Choose a quantity between 1 and 99.", true);
            renderCart();
            return;
        }
        const cart = readCart();
        const item = cart.find(function (cartItem) {
            return cartItem.id === quantityInput.dataset.quantityFor;
        });
        if (item) {
            item.quantity = quantity;
            if (saveCart(cart)) renderCart();
        }
    });

    window.addEventListener("pagehide", hideSavedOrder);
    window.addEventListener("pageshow", function () {
        const orderKey = getAccountStorageKey(lastOrderKeyPrefix);
        if (!orderKey || !localStorage.getItem(orderKey)) {
            const confirmation = document.getElementById("order-confirmation");
            if (confirmation) confirmation.hidden = true;
        }
    });

    renderProducts();
    setupSearch();
    renderOrderNotification();
    renderCart();
    initializeCheckout();
})();
