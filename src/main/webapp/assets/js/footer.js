class FooterContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<div class="footer-top separator-top">
    <div class="container">
        <div class="row mb--40">
            <div class="col-lg-12">
                <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:32px;border-bottom:1px solid rgba(0,255,136,0.1);margin-bottom:40px;flex-wrap:wrap;gap:20px;">
                    <div>
                        <span style="font-family:'Orbitron',monospace;font-size:28px;font-weight:900;letter-spacing:0.12em;background:linear-gradient(135deg,#00ff88,#00b4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;line-height:1;">NEONGEAR</span>
                        <span style="font-size:10px;font-weight:400;letter-spacing:0.35em;color:#555570;font-family:'Rajdhani',sans-serif;display:block;margin-top:4px;">GAMING COMPONENTS STORE</span>
                    </div>
                    <div style="display:flex;gap:12px;flex-wrap:wrap;">
                        <div style="background:rgba(0,255,136,0.08);border:1px solid rgba(0,255,136,0.2);border-radius:8px;padding:12px 20px;text-align:center;">
                            <span style="font-family:'Orbitron',monospace;font-size:22px;font-weight:800;background:linear-gradient(135deg,#00ff88,#00b4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;line-height:1;">10K+</span>
                            <span style="font-size:11px;color:#555570;font-family:'Rajdhani',sans-serif;letter-spacing:0.1em;text-transform:uppercase;">Products</span>
                        </div>
                        <div style="background:rgba(108,92,231,0.08);border:1px solid rgba(108,92,231,0.2);border-radius:8px;padding:12px 20px;text-align:center;">
                            <span style="font-family:'Orbitron',monospace;font-size:22px;font-weight:800;background:linear-gradient(135deg,#6c5ce7,#ff2d78);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;line-height:1;">50+</span>
                            <span style="font-size:11px;color:#555570;font-family:'Rajdhani',sans-serif;letter-spacing:0.1em;text-transform:uppercase;">Brands</span>
                        </div>
                        <div style="background:rgba(0,180,255,0.08);border:1px solid rgba(0,180,255,0.2);border-radius:8px;padding:12px 20px;text-align:center;">
                            <span style="font-family:'Orbitron',monospace;font-size:22px;font-weight:800;background:linear-gradient(135deg,#00b4ff,#00ff88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;line-height:1;">99%</span>
                            <span style="font-size:11px;color:#555570;font-family:'Rajdhani',sans-serif;letter-spacing:0.1em;text-transform:uppercase;">Satisfaction</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 col-sm-6 mb--30">
                <div class="axil-footer-widget">
                    <h5 class="widget-title">Support</h5>
                    <div class="inner">
                        <p style="color:#8888aa;font-size:14px;line-height:1.7;margin-bottom:16px;">
                            Our expert gaming team is available 24/7 to help you build your dream rig.
                        </p>
                        <ul class="support-list-item" style="list-style:none;padding:0;">
                            <li style="margin-bottom:10px;">
                                <a href="mailto:support@neongear.gg" style="color:#8888aa !important;display:flex;align-items:center;gap:10px;font-size:14px;">
                                    <i class="fal fa-envelope-open" style="color:#00ff88;width:16px;"></i> support@neongear.gg
                                </a>
                            </li>
                            <li style="margin-bottom:10px;">
                                <a href="tel:+94112345678" style="color:#8888aa !important;display:flex;align-items:center;gap:10px;font-size:14px;">
                                    <i class="fal fa-phone-alt" style="color:#00b4ff;width:16px;"></i> +94 11 234 5678
                                </a>
                            </li>
                            <li>
                                <a href="#" style="color:#8888aa !important;display:flex;align-items:center;gap:10px;font-size:14px;">
                                    <i class="fab fa-discord" style="color:#6c5ce7;width:16px;"></i> Discord Community
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-sm-6 mb--30">
                <div class="axil-footer-widget">
                    <h5 class="widget-title">Categories</h5>
                    <div class="inner">
                        <ul style="list-style:none;padding:0;">
                            <li><a href="search.html?category=gpu" style="color:#8888aa !important;font-size:14px;padding:4px 0;display:block;">Graphics Cards</a></li>
                            <li><a href="search.html?category=cpu" style="color:#8888aa !important;font-size:14px;padding:4px 0;display:block;">Processors</a></li>
                            <li><a href="search.html?category=motherboard" style="color:#8888aa !important;font-size:14px;padding:4px 0;display:block;">Motherboards</a></li>
                            <li><a href="search.html?category=ram" style="color:#8888aa !important;font-size:14px;padding:4px 0;display:block;">RAM Memory</a></li>
                            <li><a href="search.html?category=ssd" style="color:#8888aa !important;font-size:14px;padding:4px 0;display:block;">Storage (SSD)</a></li>
                            <li><a href="search.html?category=cooling" style="color:#8888aa !important;font-size:14px;padding:4px 0;display:block;">Cooling</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-sm-6 mb--30">
                <div class="axil-footer-widget">
                    <h5 class="widget-title">Account</h5>
                    <div class="inner">
                        <ul style="list-style:none;padding:0;">
                            <li><a href="my-account.html" style="color:#8888aa !important;font-size:14px;padding:4px 0;display:block;">My Account</a></li>
                            <li><a href="sign-in.html" style="color:#8888aa !important;font-size:14px;padding:4px 0;display:block;">Login / Register</a></li>
                            <li><a href="cart.html" style="color:#8888aa !important;font-size:14px;padding:4px 0;display:block;">Cart</a></li>
                            <li><a href="#" style="color:#8888aa !important;font-size:14px;padding:4px 0;display:block;">Wishlist</a></li>
                            <li><a href="index.html" style="color:#8888aa !important;font-size:14px;padding:4px 0;display:block;">Shop</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-sm-6 mb--30">
                <div class="axil-footer-widget">
                    <h5 class="widget-title">Newsletter</h5>
                    <div class="inner">
                        <p style="color:#8888aa;font-size:14px;line-height:1.6;margin-bottom:16px;">
                            Subscribe to get exclusive deals and the latest gear news.
                        </p>
                        <div style="display:flex;gap:8px;margin-bottom:20px;">
                            <input type="email" placeholder="your@email.com"
                                style="flex:1;background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.2);color:#e8e8f0;border-radius:8px;padding:10px 14px;font-family:'Rajdhani',sans-serif;font-size:14px;outline:none;transition:border-color 0.3s;"
                                onfocus="this.style.borderColor='rgba(0,255,136,0.5)'"
                                onblur="this.style.borderColor='rgba(0,255,136,0.2)'">
                            <button style="background:linear-gradient(135deg,#00ff88,#00b4ff);border:none;color:#000;border-radius:8px;padding:10px 18px;font-family:'Orbitron',monospace;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:0.05em;white-space:nowrap;">
                                JOIN
                            </button>
                        </div>
                        <div class="download-btn-group">
                            <div class="app-link" style="display:flex;gap:10px;">
                                <a href="#"><img src="assets/images/others/app-store.png" alt="App Store" style="height:36px;object-fit:contain;filter:grayscale(60%) brightness(0.8);transition:filter 0.3s;" onmouseover="this.style.filter='grayscale(0%) brightness(1)'" onmouseout="this.style.filter='grayscale(60%) brightness(0.8)'"></a>
                                <a href="#"><img src="assets/images/others/play-store.png" alt="Play Store" style="height:36px;object-fit:contain;filter:grayscale(60%) brightness(0.8);transition:filter 0.3s;" onmouseover="this.style.filter='grayscale(0%) brightness(1)'" onmouseout="this.style.filter='grayscale(60%) brightness(0.8)'"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="copyright-area copyright-default separator-top">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-xl-4">
                <div class="social-share">
                    <a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" title="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="#" title="X/Twitter"><i class="fa-brands fa-x-twitter"></i></a>
                    <a href="#" title="YouTube"><i class="fab fa-youtube"></i></a>
                    <a href="#" title="Discord"><i class="fab fa-discord"></i></a>
                </div>
            </div>
            <div class="col-xl-4 col-lg-12">
                <div class="copyright-left d-flex flex-wrap justify-content-center">
                    <ul class="quick-link" style="list-style:none;padding:0;">
                        <li style="color:#555570;font-size:13px;">©2025 <a href="index.html" style="color:#00ff88 !important;">NeonGear</a>. All rights reserved.</li>
                    </ul>
                </div>
            </div>
            <div class="col-xl-4 col-lg-12">
                <div class="copyright-right d-flex flex-wrap justify-content-xl-end justify-content-center align-items-center gap-2">
                    <span style="color:#555570;font-size:12px;font-family:'Rajdhani',sans-serif;">Secure Payment</span>
                    <ul class="payment-icons-bottom quick-link" style="list-style:none;padding:0;display:flex;gap:8px;align-items:center;">
                        <li><img src="assets/images/icons/mastercard.png" alt="Mastercard" style="height:28px;filter:grayscale(40%) brightness(0.9);"></li>
                        <li><img src="assets/images/icons/visa.png" alt="Visa" style="height:28px;filter:grayscale(40%) brightness(0.9);"></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Header Search Modal -->
<div class="header-search-modal" id="header-search-modal">
    <button class="card-close sidebar-close"><i class="fas fa-times"></i></button>
    <div class="header-search-wrap">
        <div class="card-header">
            <div class="input-group">
                <input type="search" class="form-control" name="prod-search" id="prod-search"
                    placeholder="Search gaming components..."
                    onkeyup="basicSearch(event);">
                <button type="submit" class="axil-btn btn-bg-primary"><i class="far fa-search"></i></button>
            </div>
            <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">
                <span style="font-size:12px;color:#555570;font-family:'Rajdhani',sans-serif;align-self:center;">Popular:</span>
                <a href="search.html?q=rtx4090" style="background:rgba(0,255,136,0.08);border:1px solid rgba(0,255,136,0.2);border-radius:100px;padding:4px 12px;font-size:12px;color:#00ff88 !important;font-family:'Rajdhani',sans-serif;">RTX 4090</a>
                <a href="search.html?q=ryzen9" style="background:rgba(0,180,255,0.08);border:1px solid rgba(0,180,255,0.2);border-radius:100px;padding:4px 12px;font-size:12px;color:#00b4ff !important;font-family:'Rajdhani',sans-serif;">Ryzen 9</a>
                <a href="search.html?q=ddr5" style="background:rgba(108,92,231,0.08);border:1px solid rgba(108,92,231,0.2);border-radius:100px;padding:4px 12px;font-size:12px;color:#a29bfe !important;font-family:'Rajdhani',sans-serif;">DDR5 RAM</a>
            </div>
        </div>
        <div class="card-body">
            <div class="search-result-header">
                <h6 class="title" style="text-transform:none !important;font-family:'Rajdhani',sans-serif !important;font-weight:400 !important;"><strong id="result-count">0</strong> Result Found</h6>
                <a href="search.html" class="view-all">View All</a>
            </div>
            <div class="psearch-results" id="basic-search-results"></div>
        </div>
    </div>
</div>

<!-- Cart Dropdown -->
<div class="cart-dropdown" id="cart-dropdown">
    <div class="cart-content-wrap">
        <div class="cart-header">
            <h2 class="header-title">
                <i class="fas fa-shopping-cart" style="margin-right:8px;font-size:16px;"></i>Cart Review
            </h2>
            <button class="cart-close sidebar-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="cart-body">
            <ul class="cart-item-list" id="side-panal-cart-item-list"></ul>
        </div>
        <div class="cart-footer">
            <h3 class="cart-subtotal">
                <span class="subtotal-title">Subtotal:</span>
                <span class="subtotal-amount" id="side-panel-cart-sub-total">$0.00</span>
            </h3>
            <div class="group-btn" style="display:flex;gap:10px;margin-top:16px;">
                <a href="cart.html" class="axil-btn btn-bg-white viewcart-btn" style="flex:1;text-align:center;">View Cart</a>
                <a href="checkout.html" class="axil-btn btn-bg-primary checkout-btn" style="flex:1;text-align:center;">Checkout</a>
            </div>
        </div>
    </div>
</div>

<div class="closeMask"></div>`;
    }
}
customElements.define("footer-content", FooterContent);


async function basicSearch(event) {
    let searchInput = document.getElementById("prod-search");
    if (event.code === "Enter") {
        try {
            Notiflix.Loading.pulse("Searching...", {
                clickToClose: false,
                svgColor: '#00ff88'
            });

            const response = await fetch(`api/products/basic-search?title=${searchInput.value}`);
            if (response.ok) {
                const data = await response.json();
                if (data.status) {
                    const searchData = data.basicSearchData;
                    document.getElementById("result-count").innerHTML = searchData.length;
                    document.getElementById("basic-search-results").innerHTML = "";
                    searchData.forEach((item) => {
                        document.getElementById("basic-search-results").innerHTML += `
                        <div class="axil-product-list" style="background:rgba(13,13,26,0.8);border:1px solid rgba(0,255,136,0.1);border-radius:8px;padding:12px;margin-bottom:8px;display:flex;gap:12px;align-items:center;">
                            <div class="thumbnail" style="width:60px;flex-shrink:0;">
                                <a href="single-product.html?productId=${item.stockId}">
                                    <img src="${item.image}" alt="Product" style="width:60px;height:60px;object-fit:contain;border-radius:6px;background:rgba(7,7,16,0.8);padding:4px;">
                                </a>
                            </div>
                            <div class="product-content" style="flex:1;">
                                <h6 class="product-title" style="margin-bottom:4px;">
                                    <a href="single-product.html?productId=${item.stockId}" style="color:#e8e8f0 !important;font-size:13px;font-family:'Rajdhani',sans-serif !important;font-weight:600;line-height:1.3;">${item.title}</a>
                                </h6>
                                <div class="product-price-variant" style="margin-bottom:6px;">
                                    <span style="color:#00ff88;font-family:'Orbitron',monospace;font-size:14px;font-weight:700;">$${new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(item.price)}</span>
                                </div>
                                <div class="product-cart" style="display:flex;gap:6px;">
                                    <a onclick="addToCart(${item.stockId},1)" style="background:rgba(0,255,136,0.1);border:1px solid rgba(0,255,136,0.3);color:#00ff88 !important;padding:4px 10px;border-radius:6px;font-size:12px;cursor:pointer;font-family:'Rajdhani',sans-serif;">
                                        <i class="fal fa-shopping-cart"></i> Add
                                    </a>
                                    <a href="#" style="background:rgba(255,45,120,0.1);border:1px solid rgba(255,45,120,0.3);color:#ff2d78 !important;padding:4px 10px;border-radius:6px;font-size:12px;font-family:'Rajdhani',sans-serif;">
                                        <i class="fal fa-heart"></i>
                                    </a>
                                </div>
                            </div>
                        </div>`;
                    });
                } else {
                    Notiflix.Notify.failure(data.message, { position: 'center-top' });
                }
            } else {
                Notiflix.Notify.failure("Search failed. Please try again.", { position: 'center-top' });
            }
        } catch (e) {
            Notiflix.Notify.failure(e.message, { position: 'center-top' });
        } finally {
            Notiflix.Loading.remove();
        }
    }
}
