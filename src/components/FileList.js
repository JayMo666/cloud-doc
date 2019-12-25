import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import useKeyPress from '../hooks/useKeyPress'
import useContextMenu from '../hooks/useContextMenu'
import { getParentNode } from '../utils/helper'

const { remote } = window.require('electron')
const { Menu, MenuItem } = remote

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
    const [editStatus, setEditStatus] = useState(false)
    const [value, setValue] = useState('')
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)

    const closeSearch = (editItem) => {
        // e.preventDefault()
        setEditStatus(false)
        setValue('')
        if (editItem.isNew) {
            onFileDelete(editItem.id)
        }
    }
    useEffect(() => {
        // const handleInputEvent = (event) => {
        //     const { keyCode } = event
        //     if (keyCode === 13 && editStatus) {
        //         const editItem = files.find(file=>file.id===editStatus)
        //         onSaveEdit(editItem.id,value)
        //         setEditStatus(false)
        //         setValue('')
        //     } else if (keyCode === 27 && editStatus) {
        //         closeSearch(event)
        //     }
        // }
        // document.addEventListener('keyup', handleInputEvent)
        // return () => {
        //     document.removeEventListener('keyup', handleInputEvent)
        // }
        const editItem = files.find(file => file.id === editStatus)
        if (enterPressed && editStatus && value.trim() !== '') {
            onSaveEdit(editItem.id, value, editItem.isNew)
            setEditStatus(false)
            setValue('')
        }
        if (escPressed && editStatus) {
            closeSearch(editItem)
        }
    })
    useEffect(() => {
        const newFile = files.find(file => file.isNew)
        if (newFile) {
            setEditStatus(newFile.id)
            setValue(newFile.title)
        }
    }, [files])
    let clickedItem = useContextMenu([
        {
            label: '打开',
            click: () => {
                const parentElement = getParentNode(clickedItem.current, 'file-item')
                if (parentElement) {
                    onFileClick(parentElement.dataset.id)
                }
            }
        },
        {
            label: '重命名',
            click: () => {
                const parentElement = getParentNode(clickedItem.current, 'file-item')
                if (parentElement) {
                    setEditStatus(parentElement.dataset.id)
                    setValue(parentElement.dataset.title)
                }
            }
        },
        {
            label: '删除',
            click: () => {
                const parentElement = getParentNode(clickedItem.current, 'file-item')
                if (parentElement) {
                    onFileDelete(parentElement.dataset.id)
                }
            }
        }
    ], '.file-list',[files])
    // useEffect(() => {
    //     const menu = new Menu()
    //     menu.append(new MenuItem({
    //         label: '打开',
    //         click: () => {
    //             console.log('click')
    //         }
    //     }))
    //     menu.append(new MenuItem({
    //         label: '重命名',
    //         click: () => {
    //             console.log('重命名')
    //         }
    //     }))
    //     menu.append(new MenuItem({
    //         label: '删除',
    //         click: () => {
    //             console.log('删除')
    //         }
    //     }))

    // })
    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
                        key={file.id}
                        data-id={file.id}
                        data-title={file.title}>
                        {(file.id !== editStatus && !file.isNew) &&
                            <>
                                <span className="col-2"><FontAwesomeIcon size="lg" icon={faMarkdown}></FontAwesomeIcon></span>
                                <span className="col-10 c-link" onClick={() => { onFileClick(file.id) }}>{file.title}</span>
                                {/* <button type="button" className="icon-button col-2" onClick={() => { setValue(file.title); setEditStatus(file.id); }}>
                                    <FontAwesomeIcon title="编辑" size="lg" icon={faEdit}></FontAwesomeIcon>
                                </button>
                                <button type="button" className="icon-button col-2" onClick={() => { onFileDelete(file.id) }}>
                                    <FontAwesomeIcon title="删除" size="lg" icon={faTrash}></FontAwesomeIcon>
                                </button> */}
                            </>
                        }
                        {
                            ((file.id === editStatus) || file.isNew) &&
                            <>
                                <input className="form-control col-10" value={value}
                                    placeholder="请输入文件名称"
                                    onChange={(e) => { setValue(e.target.value) }}></input>
                                <button
                                    type="button"
                                    className="icon-button col-2"
                                    onClick={() => closeSearch(file)}>
                                    <FontAwesomeIcon title="关闭" icon={faTimes} size="lg" />
                                </button>
                            </>
                        }
                    </li>
                ))
            }
        </ul>
    )
}

FileList.propTypes = {
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onFileDelete: PropTypes.func,
    onSaveEdit: PropTypes.func
}
export default FileList