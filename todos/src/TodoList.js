export default function TodoList (props) {
    return (
        <section>
            <h1>Дела</h1>
            <table className="tabe is-hoverable is-fullwidth">
                <tbody>
                    {props.list.map(item => (
                        <tr key={item.key}>
                            <td>
                                {item.done && <del>{item.title}</del>}
                                {!item.done && item.title}
                            </td>
                            <td>
                                <button
                                    className="button is-success"
                                    title="Выполнено"
                                    disabled={item.done}
                                    onClick={() => {props.setDone(item.key)}}
                                >
                                    &#9745;
                                </button>
                            </td>
                            <td>
                                <button
                                    className="button is-danger"
                                    title="Удалить"
                                    disabled={item.done}
                                >
                                    &#9746;
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}