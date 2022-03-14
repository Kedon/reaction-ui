import React, { useEffect, useState, useRef } from 'react';
import Button from '../button/Button';
import { uuidv4 } from '../../utils/uuid-generator'
import './table.scss';

const UID = uuidv4()


//import { ChevronLeft, ChevronRight } from '../../shared/icons'
const Table = ({
    columns,
    rows,
    views,
    pageSize,
    administrator,
    restricted,
    functionEdit,
    functionDelete,
    functionDetails,
    functionSave,
    customHeader,
    customBody,
    loading,
    selectable,
    serverPagination,
    onChangeServerPagination,
    onChangeSelect,
    serverTotalRows,
    immutable,
    handleRowAction,
    handleToggleArchived,
    archived,
    emptyState,
    highlightRow,
    ordering,
    changeColumnOrdering,
    tableId
}) => {
    const [select, setSelect] = useState([])
    const [controls, setControls] = useState({
        controlEdit: [],
        controlDelete: [],
        controlContent: [],
        controlSeleted: [],
    })
    const [data, setData] = useState({
        rows: [],
        columns: [],
    })
    const [pagination, setPagination] = useState({
        toRow: 0,
        fromRow: 0,
        page: 1,
        pages: [],
        page_size: pageSize,
        totalRows: 0,
        totalPages: 0,
        loading: false,
        select: false
    })

    const [columnsWidth, setColumnsWidth] = useState(null)
    const [visibility, setVisibility] = useState(false)


    useEffect(() => {
        if (!loading) {
            if (!serverPagination) {
                const newRows = []
                let count = 0
                rows.map((row, index) => {
                    if (index < (pagination.page_size * pagination.page) && index >= ((pagination.page_size * pagination.page) - pagination.page_size)) newRows.push(row)
                    count++
                })
                const pages = []
                const totalPages = rows.length % pagination.page_size > 0 ? Math.floor(rows.length / pagination.page_size + 1) : rows.length / pagination.page_size
                for (var i = 1; i <= totalPages; i++) {
                    pages.push(i)
                }
                if (count === rows.length) {
                    setPagination({
                        ...pagination,
                        toRow: pagination.page_size * pagination.page - pagination.page_size + 1,
                        fromRow: pagination.page_size * pagination.page - (pagination.page_size - newRows.length),
                        totalRows: rows.length,
                        totalPages: totalPages,
                        pages: pages,
                        page: pagination.page > pages.length ? pages.length : pagination.page < 1 ? 1 : pagination.page
                    })
                    setData({
                        ...data,
                        rows: newRows,
                        columns: columns,
                    })
                }
            } else {
                const pages = []
                const totalPages = serverTotalRows % pagination.page_size > 0 ? Math.floor(serverTotalRows / pagination.page_size + 1) : serverTotalRows / pagination.page_size
                for (var i = 1; i <= totalPages; i++) {
                    pages.push(i)
                }
                if (pages.length === Number(totalPages)) {
                    onChangeServerPagination && onChangeServerPagination({
                        page: pagination.page > pages.length ? (pages.length !== 0 ? pages.length : 1) : pagination.page < 1 ? 1 : pagination.page,
                        page_size: pagination.page_size
                    })
                    setPagination({
                        ...pagination,
                        toRow: pagination.page_size * pagination.page - pagination.page_size + 1,
                        fromRow: pagination.page_size * pagination.page - (pagination.page_size - rows.length),
                        totalRows: serverTotalRows,
                        totalPages: totalPages,
                        pages: pages,
                        page: pagination.page > pages.length ? (pages.length !== 0 ? pages.length : 1) : pagination.page < 1 ? 1 : pagination.page
                    })
                    setData({
                        ...data,
                        rows: rows,
                        columns: columns,
                    })
                }
            }
        }
    }, [pagination.page, pagination.page_size, loading, rows])

    function handleResize() {
        setTimeout(() => {
            const table = document.getElementById(UID)
            const tbody = table.querySelectorAll('tbody > tr:first-child td')
            const tableColumnsWidth = Array.from(tbody).map(cell => cell.offsetWidth)
            setColumnsWidth(tableColumnsWidth)
            setVisibility(true)
        }, 100)
    }

    useEffect(() => {
        if (rows.length > 0) {
            window.addEventListener("resize", handleResize);
            // Call handler right away so state gets updated with initial window size
            handleResize();
            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);

        }
    }, [rows])

    useEffect(() => {
        onChangeSelect && onChangeSelect(data.rows.filter(row => select.includes(row)))
    }, [select])

    const ref = useRef()
    const [selectViews, setSelectViews] = useState(false)
    const [selectPagination, setSelectPagination] = useState(false)
    const [toggleArchive, setToggleArchive] = useState(false)
    const handleClick = e => { if (ref.current && !ref.current.contains(e.target)) setSelectViews(false) };
    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    })

    const handleValue = (row, column, value) => {
        const index = data.rows.findIndex(line => line === row)
        row[column] = value
        data.rows[index] = row
        setData({
            ...data,
            rows: data.rows
        })
    }
    const handleSave = (row) => {
        functionSave(row)
        setControls({
            ...controls,
            controlEdit: controls.controlEdit.filter(line => line !== row)
        })

    }
    const handleDelete = (row) => {
        functionDelete(row)
        setData({
            ...data,
            rows: data.rows.filter(line => line !== row)
        })
        setControls({
            ...controls,
            controlDelete: controls.controlDelete.filter(line => line !== row)
        })
    }
    function changeArchived() {
        handleToggleArchived()
    }


    return (
        <div className="table-wrapper">
            {!loading ?

                <React.Fragment>
                    <div className="table-group">
                        <div className={`table-fixed-header ${visibility ? 'visible' : ''}`}>
                            <table>
                                <thead>
                                    <tr>
                                        {selectable ? <td width="1">
                                            <div
                                                className={select.length === data.rows.length ? "select select--selected" : "select"}
                                                onClick={() => {
                                                    select.length === data.rows.length ?
                                                        setSelect([])
                                                        :
                                                        setSelect(data.rows.map(line => line))
                                                }}>
                                            </div>
                                        </td> : null}

                                        {columns.filter(f => !f.hidden).map((column, i) => {
                                            const columnWidth = columnsWidth && columnsWidth[i]
                                            return (
                                                <td key={column.name} width={columnWidth} className={column.ordering ? 'ordering' : ''}>
                                                    <div className="table-head" style={{ width: columnWidth - 20 }} onClick={() =>
                                                        changeColumnOrdering({
                                                            column: column.ordering,
                                                            order: ordering && ordering.column === column.ordering && ordering && ordering.order === 0 /*DESC*/ ? 1 /*ASC*/ : 0 /*DESC*/
                                                        })
                                                    }>
                                                        <div className={`truncate ${column.ordering ? 'mr-1' : ''}`}>
                                                            {customHeader && customHeader ?
                                                                    customHeader.columns.includes(column.name) ?
                                                                        customHeader.custom(column) :
                                                                        column.label :
                                                                    column.label
                                                            }
                                                        </div>
                                                        {column.ordering &&
                                                            <div className={`table-ordering ${ordering && ordering.column === column.ordering ? 'active' : ''}`}>
                                                                {ordering && ordering.column === column.ordering && ordering && ordering.order === 0 ? <span>&#9660;</span> : <span>&#9650;</span>}
                                                            </div>
                                                        }
                                                    </div>

                                                </td>
                                            )
                                        }
                                        )}
                                        <td>
                                            
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className={`${administrator ? "table-body-wrapper table-body-wrapper--administrator" : "table-body-wrapper"}`}>

                            <table id={UID}>
                                {rows.length > 0 ?
                                    <tbody className={` ${visibility ? 'visible' : ''}`}>

                                        {data.rows.map((row, index) => (
                                            <tr key={index} className={highlightRow.rowId === row.rowId ? highlightRow.color ? highlightRow.color : 'primary' : ''}>
                                                {selectable ?
                                                    <td width="1">
                                                        <div
                                                            className={select.includes(row) ? "select select--selected" : "select"}
                                                            onClick={() => setSelect(select.includes(row) ?
                                                                select.filter(line => line !== row) :
                                                                [...select, row])}></div>
                                                    </td> : null}

                                                {columns.filter(f => !f.hidden).map((column, index) => {
                                                    const columnWidth = columnsWidth && columnsWidth[index]
                                                    return (<td key={index} width={columnWidth} style={{textAlign: column.textAlign}}>
                                                        {administrator && controls.controlEdit.includes(row) ?
                                                            !immutable.includes(column.name) ?
                                                                <input type="text" value={row[column.name]} onChange={e => handleValue(row, column.name, e.target.value)} />
                                                                :
                                                                customBody && customBody ?
                                                                    customBody.columns.includes(column.name) ?
                                                                        customBody.custom(row, column.name)
                                                                        :
                                                                        row[column.name] && row[column.name] ? row[column.name] : "---"
                                                                    :
                                                                    row[column.name] && row[column.name] ? row[column.name] : "---"
                                                            :
                                                            customBody && customBody ?
                                                                customBody.columns.includes(column.name) ?
                                                                    customBody.custom(row, column.name)
                                                                    :
                                                                    row[column.name] && row[column.name] ? row[column.name] : "---"
                                                                :
                                                                row[column.name] && row[column.name] ? row[column.name] : "---"
                                                        }
                                                    </td>)
                                                }
                                                )}
                                                {administrator ?
                                                    <td width="10">
                                                        <div className="controller">
                                                            <div
                                                                className="controller__three-points"
                                                                onClick={() => setControls({ ...controls, controlContent: controls.controlContent.includes(row) ? controls.controlContent.filter(line => line !== row) : [...controls.controlContent, row] })}>
                                                                <span></span>
                                                            </div>
                                                            <div className={controls.controlContent.includes(row) ? "controller__content controller__content--opened" : "controller__content controller__content--closed"}>
                                                                <Button.Edit className="mr-50" onClick={() => handleRowAction('edit', row)} />
                                                                {row.status === 'Arquivado' ?
                                                                    <Button.Folder className="mr-50" onClick={() => handleRowAction('unarchive', row)} />
                                                                    :
                                                                    <Button.X onClick={() => handleRowAction('delete', row)} />
                                                                }
                                                            </div>
                                                        </div>
                                                    </td> : null}
                                            </tr>))}
                                    </tbody>
                                    :
                                    <tbody>
                                        <tr className="bg-white border-none">
                                            <td colSpan={columns.filter(f => !f.hidden).length + 1}>
                                                <div className="d-flex justify-content-center h-100 align-items-center w-100 py-5">
                                                    {emptyState ? emptyState : <p className="d-block fs-24 color-red text-center">Nenhum resultado encontrado!</p>}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>

                    <div className="table-footer-wrapper">
                        <div className="table-footer-pagination">
                            <div className="pagination-counter">
                                {`${pagination.toRow} a ${pagination.fromRow} de ${pagination.totalRows}` }
                            </div>
                            <div className="select-views" ref={ref} onClick={() => setSelectViews(!selectViews)}>
                                <div className="select-views__label">
                                    {`Exibir ${pagination.page_size}` }
                                </div>
                                <div className={selectViews ? "select-views__dropdown select-views__dropdown--active" : "select-views__dropdown"}>
                                    <ul>
                                        {views.map((show, index) => (
                                            <li className={`${show === pagination.page_size ? 'selected' : ''}`} key={index} onClick={() => setPagination({ ...pagination, page_size: show })}>{show}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {pagination.totalPages > 1 &&
                            <div className="table-footer-pagination">
                                <button
                                    className="navigation-button"
                                    onClick={() => setPagination({
                                        ...pagination,
                                        page: pagination.page <= 1 ? 1 : pagination.page - 1
                                    })}>
                                    {/*<ChevronLeft height={20} width={20} />*/}&lsaquo;
                                </button>
                                <div className="select-views" onClick={() => setSelectPagination(!selectPagination)}>
                                    <div className="select-views__label">
                                        {`${pagination.page} de ${pagination.totalPages}` }
                                    </div>
                                    <div className={selectPagination ? "select-views__dropdown select-views__dropdown--active" : "select-views__dropdown"}>
                                        <ul>
                                            {Array(pagination.totalPages).fill(0).map((_, i) =>
                                                <li className={`${i + 1 === pagination.page ? 'selected' : ''}`} key={`selected-nav-page-${i + 1}`}
                                                    onClick={() => setPagination({
                                                        ...pagination,
                                                        page: i + 1
                                                    })}>{`${i + 1} de ${pagination.totalPages}` }
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                <button
                                    className="navigation-button"
                                    onClick={() => setPagination({
                                        ...pagination,
                                        page: pagination.page >= pagination.totalPages ? pagination.totalPages : pagination.page + 1
                                    })}>
                                    {/*<ChevronRight height={20} width={20} />*/}&rsaquo;
                                </button>
                            </div>
                        }
                        {/*pagination.totalPages > 0 ?
                                        pagination.pages.map((page, index) =>
                                            page === pagination.page
                                                || page === pagination.page - 1
                                                || page === pagination.page + 1
                                                || page === 1
                                                || page === pagination.totalPages ?
                                                <button
                                                    className={pagination.page === page ?
                                                        "navigation-button navigation-button--active"
                                                        : "navigation-button"} key={index} onClick={() => setPagination({
                                                            ...pagination,
                                                            page: page
                                                        })}>
                                                    {page}
                                                </button>
                                                : page === pagination.page + 2
                                                    || page === pagination.page - 2 ?
                                                    <button className="navigation-button" key={index}>...</button>
                                                    : null
                                        )
                                    : null*/}
                    </div>
                </React.Fragment>

                :
                <div className="d-flex justify-content-center align-items-center w-100 py-5">
                    <p className="d-block fs-24 color-blue text-center">Carregando... <span className="spinning-loader"></span> </p>
                </div>
            }
        </div>
    )
}

export default Table

