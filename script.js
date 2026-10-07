document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // ELEMENTS
    // =========================================

    const orderModal =
        document.getElementById("orderModal");

    const orderForm =
        document.getElementById("orderForm");

    const selectedService =
        document.getElementById("selectedService");

    const selectedPackage =
        document.getElementById("selectedPackage");

    const summaryService =
        document.getElementById("summaryService");

    const summaryPackage =
        document.getElementById("summaryPackage");

    const summaryPrice =
        document.getElementById("summaryPrice");

    const projectFile =
        document.getElementById("projectFile");


    // =========================================
    // YOUR WHATSAPP NUMBER
    // =========================================

    const businessNumber = "918699881537";


    // =========================================
    // SERVICE PRICES
    // =========================================

    const prices = {

        "Website Development": {
            "Basic": 2000,
            "Standard": 5000,
            "Premium": 10000,
            "Custom": null
        },

        "App Development": {
            "Basic": 3000,
            "Standard": 7000,
            "Premium": 15000,
            "Custom": null
        },

        "Personal AI": {
            "Basic": 3000,
            "Standard": 7000,
            "Premium": 15000,
            "Custom": null
        },

        "Poster Design": {
            "Basic": 299,
            "Standard": 499,
            "Premium": 799,
            "Custom": null
        },

        "Banner Design": {
            "Basic": 399,
            "Standard": 699,
            "Premium": 999,
            "Custom": null
        },

        "Custom Project": {
            "Basic": null,
            "Standard": null,
            "Premium": null,
            "Custom": null
        }

    };


    // =========================================
    // GET PRICE
    // =========================================

    function getPrice(service, packageName) {

        const price =
            prices[service]?.[packageName];

        if (
            price === null ||
            price === undefined
        ) {
            return "Custom Quote";
        }

        return "₹" +
            price.toLocaleString("en-IN");
    }


    // =========================================
    // GENERATE UNIQUE ORDER ID
    // =========================================

    function generateOrderID() {

        const now = new Date();

        const year =
            now.getFullYear();

        const month =
            String(now.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(now.getDate())
                .padStart(2, "0");

        const random =
            Math.floor(
                1000 + Math.random() * 9000
            );

        return "AC-" +
            year +
            month +
            day +
            "-" +
            random;
    }


    // =========================================
    // FORMAT DATE & TIME
    // =========================================

    function getOrderDateTime() {

        const now = new Date();

        return now.toLocaleString(
            "en-IN",
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );
    }


    // =========================================
    // UPDATE ORDER SUMMARY
    // =========================================

    function updateSummary() {

        const service =
            selectedService.value;

        const packageName =
            selectedPackage.value;

        summaryService.textContent =
            service;

        summaryPackage.textContent =
            packageName;

        summaryPrice.textContent =
            getPrice(
                service,
                packageName
            );
    }


    // =========================================
    // OPEN ORDER FORM
    // =========================================

    window.openOrderForm = function () {

        selectedService.value =
            "Website Development";

        selectedPackage.value =
            "Basic";

        updateSummary();

        orderModal.classList.add("active");

        document.body.style.overflow =
            "hidden";
    };


    // =========================================
    // OPEN FORM FOR SELECTED SERVICE
    // =========================================

    window.orderService = function (serviceName) {

        selectedService.value =
            serviceName;

        updateSummary();

        orderModal.classList.add("active");

        document.body.style.overflow =
            "hidden";
    };


    // =========================================
    // CLOSE ORDER FORM
    // =========================================

    window.closeOrderForm = function () {

        orderModal.classList.remove("active");

        document.body.style.overflow =
            "";
    };


    // =========================================
    // SERVICE / PACKAGE CHANGE
    // =========================================

    selectedService.addEventListener(
        "change",
        updateSummary
    );

    selectedPackage.addEventListener(
        "change",
        updateSummary
    );


    // =========================================
    // FILE SELECT
    // =========================================

    if (projectFile) {

        projectFile.addEventListener(
            "change",
            function () {

                if (!this.files.length) {
                    return;
                }

                const fileName =
                    this.files[0].name;

                const fileContent =
                    document.querySelector(
                        ".file-upload-content"
                    );

                if (fileContent) {

                    fileContent.innerHTML = "";

                    const icon =
                        document.createElement("span");

                    icon.className =
                        "upload-icon";

                    icon.textContent =
                        "✅";

                    const strong =
                        document.createElement("strong");

                    strong.textContent =
                        fileName;

                    const small =
                        document.createElement("small");

                    small.textContent =
                        "File selected";

                    fileContent.appendChild(icon);
                    fileContent.appendChild(strong);
                    fileContent.appendChild(small);
                }
            }
        );
    }


    // =========================================
    // SEND ORDER
    // =========================================

    orderForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // CUSTOMER NAME
            const name =
                document
                    .getElementById("customerName")
                    .value
                    .trim();


            // CUSTOMER WHATSAPP
            const whatsapp =
                document
                    .getElementById("customerWhatsapp")
                    .value
                    .trim();


            // CUSTOMER EMAIL
            const email =
                document
                    .getElementById("customerEmail")
                    .value
                    .trim();


            // SERVICE
            const service =
                selectedService.value;


            // PACKAGE
            const packageName =
                selectedPackage.value;


            // REQUIREMENTS
            const requirements =
                document
                    .getElementById("projectRequirements")
                    .value
                    .trim();


            // FILE NAME
            let fileName =
                "No file attached";

            if (
                projectFile &&
                projectFile.files.length > 0
            ) {

                fileName =
                    projectFile.files[0].name;
            }


            // REQUIRED FIELDS
            if (
                !name ||
                !whatsapp ||
                !requirements
            ) {

                alert(
                    "Please fill all required fields."
                );

                return;
            }


            // =========================================
            // CREATE ORDER DETAILS
            // =========================================

            const orderID =
                generateOrderID();

            const orderDate =
                getOrderDateTime();

            const price =
                getPrice(
                    service,
                    packageName
                );


            // =========================================
            // ORDER OBJECT
            // =========================================

            const order = {

                orderID: orderID,

                dateTime: orderDate,

                customer: {
                    name: name,
                    whatsapp: whatsapp,
                    email: email || "Not provided"
                },

                service: service,

                package: packageName,

                price: price,

                requirements: requirements,

                fileName: fileName,

                status: "New"
            };


            // =========================================
            // SAVE ORDER IN BROWSER
            // =========================================

            let savedOrders = [];

            try {

                savedOrders =
                    JSON.parse(
                        localStorage.getItem(
                            "ansariesOrders"
                        )
                    ) || [];

            } catch (error) {

                savedOrders = [];
            }


            savedOrders.push(order);


            localStorage.setItem(
                "ansariesOrders",
                JSON.stringify(savedOrders)
            );


            // =========================================
            // WHATSAPP MESSAGE
            // =========================================

            const message =

                "🚀 NEW ORDER - ANSARIE'S CREATIONS\n" +
                "━━━━━━━━━━━━━━━━━━━━\n\n" +

                "🆔 Order ID: " +
                orderID +
                "\n" +

                "📅 Date & Time: " +
                orderDate +
                "\n\n" +

                "👤 CUSTOMER DETAILS\n" +
                "Name: " +
                name +
                "\n" +

                "📱 WhatsApp: " +
                whatsapp +
                "\n" +

                "📧 Email: " +
                (
                    email ||
                    "Not provided"
                ) +
                "\n\n" +

                "🛠️ SERVICE DETAILS\n" +
                "Service: " +
                service +
                "\n" +

                "📦 Package: " +
                packageName +
                "\n" +

                "💰 Estimated Price: " +
                price +
                "\n\n" +

                "📝 REQUIREMENTS\n" +
                requirements +
                "\n\n" +

                "📎 File: " +
                fileName +
                "\n\n" +

                "📌 Status: New\n\n" +

                "Thank you for choosing " +
                "Ansarie's Creations!";


            // =========================================
            // WHATSAPP URL
            // =========================================

            const whatsappURL =
                "https://wa.me/" +
                businessNumber +
                "?text=" +
                encodeURIComponent(
                    message
                );


            // =========================================
            // OPEN WHATSAPP
            // =========================================

            window.open(
                whatsappURL,
                "_blank"
            );


            // =========================================
            // SUCCESS MESSAGE
            // =========================================

            alert(
                "✅ Order Created Successfully!\n\n" +
                "Order ID: " +
                orderID +
                "\n\n" +
                "Your order details are being sent to WhatsApp."
            );


            // =========================================
            // RESET FORM
            // =========================================

            orderForm.reset();

            selectedService.value =
                service;

            selectedPackage.value =
                packageName;

            updateSummary();


            // =========================================
            // CLOSE FORM
            // =========================================

            setTimeout(
                function () {

                    closeOrderForm();

                },
                500
            );

        }
    );


    // =========================================
    // CLOSE WHEN CLICKING OUTSIDE
    // =========================================

    orderModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                orderModal
            ) {

                closeOrderForm();
            }
        }
    );


    // =========================================
    // ESC KEY
    // =========================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeOrderForm();
            }
        }
    );


    // =========================================
    // INITIAL SUMMARY
    // =========================================

    updateSummary();

});