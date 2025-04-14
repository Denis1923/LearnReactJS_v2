const date1 = new Date(2024, 6, 18, 10, 24);
const date2 = new Date(2024, 6, 19, 14, 47);

const todos = [
    {
        title: 'Изучаем React',
        desc: 'Да поскорее!',
        image: '',
        done: true,
        createAt: date1.toLocaleDateString(),
        key: date1.getTime()
    },
    {
        title: 'Написать первое React-приложение',
        desc: 'Список эапланированных дел',
        image: '',
        done: false,
        createAt: date2.toLocaleDateString(),
        key: date2.getTime()
    }
]

export default todos; // ? что значит export default
