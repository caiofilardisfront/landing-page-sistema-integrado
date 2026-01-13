// --- 1. DADOS ---
    const MENU = {
        "bolos": [
            { id: 1, name: "Bolo de Chocolate", price: 45.00, dsc: "Recheio cremoso de ganache com morangos.", img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=634&q=80" },
            { id: 2, name: "Red Velvet", price: 50.00, dsc: "Massa aveludada vermelha com cream cheese.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKZW5fkZsfhfUrv_iOjL-J-qhAiGaE14kjTg&s" },
            { id: 3, name: "Bolo de Cenoura", price: 35.00, dsc: "O clássico fofinho com vulcão de brigadeiro.", img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=634&q=80" }
        ],
        "doces": [
            { id: 4, name: "Cookies Clássicos", price: 8.00, dsc: "Crocantes por fora, macios por dentro.", img: "https://images.unsplash.com/photo-1552689486-f6773047d19f?w=651&q=80" },
            { id: 5, name: "Macarons", price: 6.50, dsc: "Sortidos: Pistache, Framboesa, Baunilha.", img: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=634&q=80" },
            { id: 6, name: "Cupcake Floral", price: 10.00, dsc: "Base de baunilha com buttercream decorado.", img: "https://media.istockphoto.com/id/114302447/pt/foto/vintage-cupcakes.jpg?s=612x612&w=0&k=20&c=wIlWOXhxfTWeY7jTkjkRxM6qDdHj8RlXgKjkXnHoKeM=" }
        ],
        "tortas": [
            { id: 7, name: "Torta de Frutas", price: 55.00, dsc: "Base sablée, creme patissière e frutas.", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=634&q=80" },
            { id: 8, name: "Banoffee", price: 52.00, dsc: "Camadas perfeitas de banana e doce de leite.", img: "https://i.ytimg.com/vi/57rMmZL6png/sddefault.jpg" }
        ],
        "bebidas": [
            { id: 9, name: "Cappuccino", price: 10.00, dsc: "Espresso duplo, leite vaporizado, cacau.", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=634&q=80" },
            { id: 10, name: "Chá de Hibisco", price: 8.00, dsc: "Infusão gelada com limão siciliano.", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=634&q=80" }
        ]
    };

    const REVIEWS = [
        { name: "Maria Silva", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80", text: "O melhor bolo de cenoura que já comi na vida! A cobertura é generosa e a massa super fofinha. Recomendo demais!", rating: "★★★★★" },
        { name: "Carlos Eduardo", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80", text: "Encomendei os doces para o aniversário da minha filha e foi um sucesso. O Red Velvet é simplesmente divino.", rating: "★★★★★" },
        { name: "Ana Clara", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80", text: "Atendimento impecável e entrega rápida. O Banoffee chegou perfeito e geladinho. Virei cliente fiel!", rating: "★★★★★" },
        { name: "João Pedro", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80", text: "O ambiente da loja é lindo e o café é sensacional. Ideal para um fim de tarde.", rating: "★★★★☆" }
    ];

    const CATEGORY_ICONS = { 'all': '✨', 'bolos': '🎂', 'doces': '🍪', 'tortas': '🥧', 'bebidas': '☕' };