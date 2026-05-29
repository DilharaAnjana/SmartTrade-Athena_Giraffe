class HeaderContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<div class="axil-header-top">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-sm-6">
                <div class="header-top-dropdown">
                    <div class="dropdown">
                        <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-globe" style="margin-right:4px;color:#00ff88;font-size:11px;"></i> EN
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">English</a></li>
                        </ul>
                    </div>
                    <div class="dropdown">
                        <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-dollar-sign" style="margin-right:4px;color:#00ff88;font-size:11px;"></i> USD
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">USD</a></li>
                            <li><a class="dropdown-item" href="#">LKR</a></li>
                        </ul>
                    </div>
                    <span style="color:#555570;font-size:12px;font-family:'Rajdhani',sans-serif;letter-spacing:0.05em;">
                        <i class="fas fa-shipping-fast" style="color:#00ff88;margin-right:4px;"></i>Free shipping on orders over $500
                    </span>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="header-top-link">
                    <ul class="quick-link">
                        <li><a href="#"><i class="fas fa-headset" style="margin-right:4px;"></i>Support</a></li>
                        <li><a href="sign-up.html"><i class="fas fa-user-plus" style="margin-right:4px;"></i>Join Us</a></li>
                        <li><a href="sign-in.html"><i class="fas fa-sign-in-alt" style="margin-right:4px;"></i>Sign In</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="axil-sticky-placeholder"></div>
<div class="axil-mainmenu">
    <div class="container">
        <div class="header-navbar">
            <div class="header-brand">
                <a href="index.html" class="logo logo-dark ng-logo-text" style="text-decoration:none !important;">
                    <span style="font-family:'Orbitron',monospace;font-size:22px;font-weight:900;letter-spacing:0.12em;background:linear-gradient(135deg,#00ff88,#00b4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;line-height:1;">NEONGEAR</span>
                    <span style="font-size:9px;font-weight:400;letter-spacing:0.35em;display:block;color:#555570;-webkit-text-fill-color:#555570;margin-top:3px;font-family:'Rajdhani',sans-serif;">GAMING COMPONENTS</span>
                </a>
                <a href="index.html" class="logo logo-light ng-logo-text" style="text-decoration:none !important;">
                    <span style="font-family:'Orbitron',monospace;font-size:22px;font-weight:900;letter-spacing:0.12em;background:linear-gradient(135deg,#00ff88,#00b4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;line-height:1;">NEONGEAR</span>
                    <span style="font-size:9px;font-weight:400;letter-spacing:0.35em;display:block;color:#555570;-webkit-text-fill-color:#555570;margin-top:3px;font-family:'Rajdhani',sans-serif;">GAMING COMPONENTS</span>
                </a>
            </div>
            <div class="header-main-nav">
                <nav class="mainmenu-nav">
                    <button class="mobile-close-btn mobile-nav-toggler"><i class="fas fa-times"></i></button>
                    <div class="mobile-nav-brand">
                        <a href="index.html" style="text-decoration:none !important;">
                            <span style="font-family:'Orbitron',monospace;font-size:18px;font-weight:900;background:linear-gradient(135deg,#00ff88,#00b4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">NEONGEAR</span>
                        </a>
                    </div>
                    <ul class="mainmenu">
                        <li class="menu-item-has-children">
                            <a href="search.html"><i class="fas fa-microchip" style="margin-right:6px;color:#00ff88;font-size:12px;"></i>CPU</a>
                            <ul class="axil-submenu">
                                <li><a href="search.html?category=cpu&brand=intel">Intel Core Series</a></li>
                                <li><a href="search.html?category=cpu&brand=amd">AMD Ryzen Series</a></li>
                                <li><a href="search.html?category=cpu">All Processors</a></li>
                            </ul>
                        </li>
                        <li class="menu-item-has-children">
                            <a href="search.html"><i class="fas fa-th-large" style="margin-right:6px;color:#00b4ff;font-size:12px;"></i>GPU</a>
                            <ul class="axil-submenu">
                                <li><a href="search.html?category=gpu&brand=nvidia">NVIDIA GeForce</a></li>
                                <li><a href="search.html?category=gpu&brand=amd">AMD Radeon</a></li>
                                <li><a href="search.html?category=gpu">All Graphics Cards</a></li>
                            </ul>
                        </li>
                        <li class="menu-item-has-children">
                            <a href="search.html"><i class="fas fa-memory" style="margin-right:6px;color:#6c5ce7;font-size:12px;"></i>Memory</a>
                            <ul class="axil-submenu">
                                <li><a href="search.html?category=ram">DDR5 RAM</a></li>
                                <li><a href="search.html?category=ram">DDR4 RAM</a></li>
                                <li><a href="search.html?category=ssd">NVMe SSD</a></li>
                                <li><a href="search.html?category=ssd">SATA SSD</a></li>
                            </ul>
                        </li>
                        <li class="menu-item-has-children">
                            <a href="search.html"><i class="fas fa-server" style="margin-right:6px;color:#ff6b35;font-size:12px;"></i>Motherboards</a>
                            <ul class="axil-submenu">
                                <li><a href="search.html?category=motherboard&socket=am5">AMD AM5</a></li>
                                <li><a href="search.html?category=motherboard&socket=lga1700">Intel LGA1700</a></li>
                                <li><a href="search.html?category=motherboard">All Motherboards</a></li>
                            </ul>
                        </li>
                        <li class="menu-item-has-children">
                            <a href="search.html"><i class="fas fa-gamepad" style="margin-right:6px;color:#ff2d78;font-size:12px;"></i>Peripherals</a>
                            <ul class="axil-submenu">
                                <li><a href="search.html?category=keyboard">Gaming Keyboards</a></li>
                                <li><a href="search.html?category=mouse">Gaming Mice</a></li>
                                <li><a href="search.html?category=headset">Gaming Headsets</a></li>
                                <li><a href="search.html?category=monitor">Gaming Monitors</a></li>
                            </ul>
                        </li>
                        <li><a href="search.html"><i class="fas fa-bolt" style="margin-right:6px;color:#00ff88;font-size:12px;"></i>Deals</a></li>
                    </ul>
                </nav>
            </div>
            <div class="header-action">
                <ul class="action-list">
                    <li class="axil-search">
                        <a href="javascript:void(0)" class="header-search-icon" title="Search">
                            <i class="flaticon-magnifying-glass"></i>
                        </a>
                    </li>
                    <li class="wishlist">
                        <a href="#" title="Wishlist">
                            <i class="flaticon-heart"></i>
                        </a>
                    </li>
                    <li class="shopping-cart">
                        <a onclick="loadCartItems();" class="cart-dropdown-btn" title="Cart" style="cursor:pointer;">
                            <span class="cart-count" id="cart-count">0</span>
                            <i class="flaticon-shopping-cart"></i>
                        </a>
                    </li>
                    <li class="my-account">
                        <a href="javascript:void(0)" title="Account">
                            <i class="flaticon-person"></i>
                        </a>
                        <div class="my-account-dropdown">
                            <span class="title">QUICK ACCESS</span>
                            <ul>
                                <li><a href="my-account.html"><i class="fas fa-user" style="width:16px;margin-right:8px;color:#00ff88;"></i>My Account</a></li>
                                <li><a href="my-account.html"><i class="fas fa-box" style="width:16px;margin-right:8px;color:#00b4ff;"></i>My Orders</a></li>
                                <li><a href="#"><i class="fas fa-headset" style="width:16px;margin-right:8px;color:#6c5ce7;"></i>Support</a></li>
                            </ul>
                            <div class="login-btn">
                                <a href="sign-in.html" class="axil-btn btn-bg-primary" style="width:100%;text-align:center;display:block;">Login</a>
                            </div>
                            <div class="reg-footer text-center">No account yet? <a href="sign-up.html" class="btn-link">REGISTER HERE.</a></div>
                        </div>
                    </li>
                    <li class="axil-mobile-toggle">
                        <button class="menu-btn mobile-nav-toggler">
                            <i class="flaticon-menu-2"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>`;
    }
}
customElements.define("header-content", HeaderContent);
