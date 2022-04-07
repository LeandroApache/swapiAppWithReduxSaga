const LIMIT = 10;//number of items which we received from our API

const Pagination = ({total, page, onChange}) => {
    const totalPages = Math.ceil(total / LIMIT);


    return <div>
        {Array
            .from({length: totalPages}, (_, index) => index + 1)
            .map(pageIndex => {
                const changeHandler = () => {
                    if (pageIndex !== page) {
                        onChange(pageIndex);
                    }
                }
                const isActive = pageIndex === page;
                return isActive ? <b key={pageIndex} onClick={changeHandler}>{pageIndex}</b> :
                    <span key={pageIndex} onClick={changeHandler}>{pageIndex} < /span>
            })
        }
    </div>
};

export default Pagination;
