const options = {
    locale: 'ru-RU', // Устанавливаем локаль на русский (ru-RU)
    year: 'numeric', // Отображать год числом
    month: 'long', // Отображать месяц полностью (например, "январь")
    day: 'numeric', // Отображать день числом
    hour: 'numeric', // Отображать часы числом
    minute: 'numeric', // Отображать минуты числом
    second: 'numeric', // Отображать секунды числом
    timeZoneName: 'short' // Отображать короткое название часового пояса (например, "MSK")
};




export default function useDateFormat(date) {
    const time = new Date(date);
    const formatter = new Intl.DateTimeFormat('ru-RU', options);
    const formattedDate = formatter.format(time);
    return formattedDate
}
