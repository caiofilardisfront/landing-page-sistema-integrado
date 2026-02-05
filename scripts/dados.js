// --- 1. DADOS ---
const MENU = {
    "bolos": [
        { id: 1, name: "Bolo mousse de chocolate", price: 45.00, dsc: "Massa com sabor profundo de chocolate com mousse cremosa.- Leite Ninho com morangos - massa branca leve com recheio de leite ninho com morangos frescos", img: "https://harald.com.br/wp-content/uploads/2020/08/bolo-mousse-720x500-1.jpg" },
        { id: 2, name: "Trufado preto e branco", price: 50.00, dsc: "Massa de chocolate com mousse trufada dupla .", img: "https://cdn.sodiedoces.com.br/wp-content/uploads/2021/09/01103636/77-Trufado-Preto-e-Branco-540x400px_.png" },
        { id: 3, name: "Mousse de Maracujá", price: 35.00, dsc: "Massa branca com recheio delicado de mousse de maracujá e curd de maracujá.", img: "https://guiadacozinha.com.br/wp-content/uploads/2019/11/Mousse-de-maracuja-com-cachaca.jpg" }
    ],
    "doces": [
        { id: 4, name: "Cookies Clássicos", price: 8.00, dsc: "Crocantes por fora, macios por dentro.", img: "https://images.unsplash.com/photo-1552689486-f6773047d19f?w=651&q=80" },
        { id: 5, name: "Macarons", price: 6.50, dsc: "Sortidos: Pistache, Framboesa, Baunilha.", img: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=634&q=80" },
        { id: 6, name: "Cupcake Floral", price: 10.00, dsc: "Base de baunilha com buttercream decorado.", img: "https://media.istockphoto.com/id/114302447/pt/foto/vintage-cupcakes.jpg?s=612x612&w=0&k=20&c=wIlWOXhxfTWeY7jTkjkRxM6qDdHj8RlXgKjkXnHoKeM=" }
    ],
    "tortas": [
        { id: 7, name: "Ferreiro", price: 55.00, dsc: "Massa sablé de chocolate recheio de chocolate profundo com pralinê de avelãs torradas .", img: "https://dolcciemporio.com.br/wp-content/uploads/2023/01/Torta-de-ferreiro-rocher-2.jpg" },
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