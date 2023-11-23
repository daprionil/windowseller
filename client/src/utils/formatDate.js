export default function(date){
    const formatter = new Intl.DateTimeFormat('es-ES', {
        dateStyle: 'long',
        timeStyle: 'short',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
    return formatter.format(new Date(date));
}