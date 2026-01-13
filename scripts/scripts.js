// --- 2. SISTEMA DE CARRINHO ---
    let cart = [];

    function calculateTotal() {
        return cart.reduce((total, item) => total + (item.price * item.qty), 0);
    }

    function addToCart(id, name, price, img) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ id, name, price, img, qty: 1 });
        }
        updateCartCounter();
        if(document.getElementById('cart-modal-overlay').style.display === 'flex'){
            renderCartItems(); 
        }
        const btn = event.target.closest('.add-btn');
        if(btn) {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = 'var(--success)';
            btn.style.color = 'white';
            setTimeout(() => { btn.innerHTML = originalHTML; btn.style.background = ''; btn.style.color = ''; }, 1000);
        }
    }

    function removeFromCart(id) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.qty -= 1;
            if (item.qty <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
        }
        updateCartCounter();
        renderCartItems();
    }

    function updateCartCounter() {
        const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        const counter = document.getElementById('cart-count');
        counter.textContent = totalQty;
        counter.style.display = totalQty > 0 ? 'flex' : 'none';
        const floatBtn = document.querySelector('.cart-float-btn');
        floatBtn.style.transform = 'scale(1.2)';
        setTimeout(() => floatBtn.style.transform = 'scale(1)', 200);
    }

    function openCartModal() {
        document.getElementById('cart-modal-overlay').style.display = 'flex';
        goToStep('cart');
    }

    function closeCartModal() {
        document.getElementById('cart-modal-overlay').style.display = 'none';
    }

    function goToStep(step) {
        document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
        const footer = document.getElementById('modal-footer');
        
        if (step === 'cart') {
            document.getElementById('modal-title').innerText = 'Seu Carrinho';
            document.getElementById('step-cart').classList.add('active');
            renderCartItems();
            footer.innerHTML = `
                <button class="btn btn-full btn-back" onclick="closeCartModal()">Continuar Comprando</button>
                <button class="btn btn-full" onclick="goToStep('address')">Próximo: Dados</button>
            `;
        } 
        else if (step === 'address') {
            if (cart.length === 0) { alert("Carrinho vazio!"); return goToStep('cart'); }
            document.getElementById('modal-title').innerText = 'Dados & Entrega';
            document.getElementById('step-address').classList.add('active');
            footer.innerHTML = `
                <button class="btn btn-full btn-back" onclick="goToStep('cart')">Voltar</button>
                <button class="btn btn-full" onclick="goToStep('summary')">Próximo: Resumo</button>
            `;
        } 
        else if (step === 'summary') {
            const name = document.getElementById('client-name').value;
            const phone = document.getElementById('client-phone').value;
            const cep = document.getElementById('cep').value;
            const number = document.getElementById('number').value;
            const payment = document.getElementById('payment-method').value;
            
            if (!name || !phone || cep.length < 8 || number === "" || payment === "") {
                alert("Por favor, preencha seus dados pessoais, endereço e forma de pagamento.");
                return goToStep('address');
            }
            
            document.getElementById('modal-title').innerText = 'Confirmar Pedido';
            document.getElementById('step-summary').classList.add('active');
            renderSummary();
            footer.innerHTML = `
                <button class="btn btn-full btn-back" onclick="goToStep('address')">Voltar</button>
                <button class="btn btn-full btn-whatsapp" onclick="finalizeOrder()">
                    <i class="fab fa-whatsapp"></i> Enviar Pedido
                </button>
            `;
        }
    }

    function renderCartItems() {
        const container = document.getElementById('cart-items-container');
        container.innerHTML = '';
        if (cart.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding:40px; color:#aaa;"><i class="fas fa-shopping-basket" style="font-size:3rem; margin-bottom:10px;"></i><p>Seu carrinho está vazio.</p></div>';
        } else {
            cart.forEach(item => {
                const html = `
                    <div class="cart-item">
                        <img src="${item.img}" class="cart-item-img" alt="${item.name}">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">${(item.price).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
                        </div>
                        <div class="cart-controls">
                            <button class="qty-btn" onclick="removeFromCart(${item.id})">-</button>
                            <span style="font-weight:bold; font-size:1.1rem;">${item.qty}</span>
                            <button class="qty-btn" onclick="addToCart(${item.id}, '${item.name}', ${item.price}, '${item.img}')">+</button>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', html);
            });
        }
        const total = calculateTotal();
        document.getElementById('cart-total-price').innerText = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }

    function renderSummary() {
        const summaryText = `
            <div style="margin-bottom:15px;">
                <strong>Cliente:</strong> ${document.getElementById('client-name').value}<br>
                <strong>Tel:</strong> ${document.getElementById('client-phone').value}<br>
                <strong>Email:</strong> ${document.getElementById('client-email').value || 'Não informado'}<br>
                <strong>Pagamento:</strong> ${document.getElementById('payment-method').value}
            </div>
            <div style="border-top:1px dashed #ccc; padding-top:10px;">
                <strong>Entrega em:</strong><br>
                ${document.getElementById('address').value}, ${document.getElementById('number').value}<br>
                ${document.getElementById('neighborhood').value} - CEP: ${document.getElementById('cep').value}<br>
                ${document.getElementById('complement').value ? 'Ref: ' + document.getElementById('complement').value : ''}
            </div>
        `;
        document.getElementById('delivery-review').innerHTML = summaryText;

        const listContainer = document.getElementById('summary-items-list');
        listContainer.innerHTML = '';
        cart.forEach(item => {
            const subtotal = item.price * item.qty;
            listContainer.innerHTML += `
                <div style="display:flex; justify-content:space-between; margin-bottom:5px; padding-bottom:5px; border-bottom:1px dotted #eee;">
                    <span>${item.qty}x ${item.name}</span>
                    <span>${subtotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                </div>
            `;
        });
        const total = calculateTotal();
        document.getElementById('final-total-price').innerText = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }

    function searchCep() {
        const cep = document.getElementById('cep').value.replace(/\D/g, '');
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(res => res.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('address').value = data.logradouro;
                        document.getElementById('neighborhood').value = data.bairro;
                        document.getElementById('number').focus();
                    } else { alert("CEP não encontrado."); }
                })
                .catch(() => alert("Erro ao buscar CEP."));
        }
    }

    function finalizeOrder() {
        const phone = "5521995291891"; 
        const total = calculateTotal();
        let msg = "*OLÁ! GOSTARIA DE FAZER UM PEDIDO:*\n\n";
        
        msg += "*👤 DADOS DO CLIENTE:*\n";
        msg += `Nome: ${document.getElementById('client-name').value}\n`;
        msg += `Tel: ${document.getElementById('client-phone').value}\n`;
        msg += `Email: ${document.getElementById('client-email').value || 'N/A'}\n\n`;

        msg += "*🛒 ITENS DO PEDIDO:*\n";
        cart.forEach(item => {
            msg += `• ${item.qty}x ${item.name} - ${(item.price * item.qty).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}\n`;
        });
        
        msg += `\n*💰 TOTAL: ${total.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}*\n`;
        msg += `*💳 PAGAMENTO:* ${document.getElementById('payment-method').value}\n`;
        msg += "----------------------------------\n";
        msg += "*📍 ENDEREÇO DE ENTREGA:*\n";
        msg += `Rua: ${document.getElementById('address').value}, Nº ${document.getElementById('number').value}\n`;
        msg += `Bairro: ${document.getElementById('neighborhood').value}\n`;
        msg += `CEP: ${document.getElementById('cep').value}\n`;
        if(document.getElementById('complement').value) msg += `Ref: ${document.getElementById('complement').value}\n`;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        cart = []; updateCartCounter(); closeCartModal();
    }

    window.addEventListener('scroll', function() {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    function toggleMenu() {
        const nav = document.getElementById('nav-links');
        const hamburger = document.querySelector('.hamburger');
        nav.classList.toggle('active');
        hamburger.classList.toggle('toggle');
        const icon = hamburger.querySelector('i');
        if (nav.classList.contains('active')) { icon.classList.remove('fa-bars'); icon.classList.add('fa-times'); } 
        else { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
    }

    // --- SLIDER HERO (LÓGICA ATUALIZADA) ---
    const slides = Array.from(document.querySelectorAll('.slide'));
    const dots = Array.from(document.querySelectorAll('.dot'));
    let currentSlide = 0; 
    const totalSlides = slides.length;

    function updateSlider() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        dots.forEach((dot, index) => {
            if (index === currentSlide) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    function nextSlide() { 
        currentSlide = (currentSlide + 1) % totalSlides; 
        updateSlider(); 
    }

    function prevSlide() { 
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; 
        updateSlider(); 
    }

    document.getElementById('nextSlide').addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    document.getElementById('prevSlide').addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
    
    let sliderInterval = setInterval(nextSlide, 5000);
    
    function resetAutoPlay() { 
        clearInterval(sliderInterval); 
        sliderInterval = setInterval(nextSlide, 5000); 
    }

    // --- DEPOIMENTOS (LOGICA) ---
    const testimonialTrack = document.getElementById('testimonial-track');
    let currentTestimonial = 0;

    function renderTestimonials() {
        testimonialTrack.innerHTML = '';
        REVIEWS.forEach(review => {
            const itemHTML = `
                <div class="testimonial-item">
                    <div class="testimonial-card">
                        <img src="${review.img}" class="client-img" alt="${review.name}">
                        <i class="fas fa-quote-left quote-icon"></i>
                        <p class="client-text">"${review.text}"</p>
                        <div class="client-name">${review.name}</div>
                        <div class="client-rating">${review.rating}</div>
                    </div>
                </div>
            `;
            testimonialTrack.insertAdjacentHTML('beforeend', itemHTML);
        });
    }

    function updateTestimonialSlider() {
        testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % REVIEWS.length;
        updateTestimonialSlider();
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + REVIEWS.length) % REVIEWS.length;
        updateTestimonialSlider();
    }

    // Init
    let state = { filter: 'all', search: '' };
    const container = document.getElementById('products-container');
    const countLabel = document.getElementById('results-count');
    const tabsContainer = document.getElementById('category-tabs');
    const searchInput = document.getElementById('search-input');

    function init() {
        renderTabs();
        filterAndRender();
        renderTestimonials(); // Inicia depoimentos
        document.getElementById('year').textContent = new Date().getFullYear();
    }

    function renderTabs() {
        let html = `<button class="cat-btn active" onclick="setCategory('all')">${CATEGORY_ICONS['all']} Todos</button>`;
        for(let key in MENU) {
            let label = key.charAt(0).toUpperCase() + key.slice(1);
            html += `<button class="cat-btn" onclick="setCategory('${key}')">${CATEGORY_ICONS[key] || '🍰'} ${label}</button>`;
        }
        tabsContainer.innerHTML = html;
    }

    function filterAndRender() {
        container.innerHTML = '';
        let count = 0;
        let allProducts = [];
        for (let key in MENU) { MENU[key].forEach(p => allProducts.push({ ...p, category: key })); }

        const filtered = allProducts.filter(p => {
            return (state.filter === 'all' || p.category === state.filter) && 
                   p.name.toLowerCase().includes(state.search.toLowerCase());
        });

        if (filtered.length === 0) {
            container.innerHTML = `<div class="no-results"><i class="far fa-sad-tear"></i><p>Nada encontrado.</p></div>`;
            countLabel.textContent = `0 produtos`;
        } else {
            filtered.forEach(product => {
                count++;
                let priceFormatted = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                let catName = product.category.charAt(0).toUpperCase() + product.category.slice(1);
                let html = `
                    <div class="product-card">
                        <div class="product-img">
                            <span class="category-badge">${catName}</span>
                            <img src="${product.img}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <h3 class="product-name" contenteditable="true">${product.name}</h3>
                            <p class="product-desc" contenteditable="true">${product.dsc}</p>
                            <div class="product-footer">
                                <span class="product-price" contenteditable="true">${priceFormatted}</span>
                                <div class="add-btn" title="Adicionar" onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.img}')">
                                    <i class="fas fa-plus"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', html);
            });
            countLabel.textContent = `${count} delícias encontradas`;
        }
        if(typeof isEditMode !== 'undefined' && isEditMode) toggleEditStyles(true);
    }

    window.setCategory = (cat) => {
        state.filter = cat;
        document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
        event.target.closest('button').classList.add('active');
        filterAndRender();
    };

    searchInput.addEventListener('input', (e) => {
        state.search = e.target.value.trim();
        filterAndRender();
    });

    let isEditMode = false;
    const editBtn = document.getElementById('edit-btn');
    function toggleEditStyles(active) {
        document.querySelectorAll('[contenteditable="true"]').forEach(el => {
            el.style.borderBottom = active ? '1px dashed var(--secondary)' : 'none';
        });
    }
    editBtn.addEventListener('click', () => {
        isEditMode = !isEditMode;
        if(isEditMode) { editBtn.style.opacity=1; toggleEditStyles(true); } 
        else { editBtn.style.opacity=0.5; toggleEditStyles(false); }
    });

    init();