export default function(price){
    const intlPriceFormat = new Intl.NumberFormat('es-ES', { currency: 'COP'});
    return intlPriceFormat.format(price);
}