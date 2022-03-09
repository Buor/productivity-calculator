import React, {useState} from 'react';
import {ManualModal} from "./ManualModal";
import {ManualButtonOpen} from "./ManualButtonOpen";

interface IProps {

}

export const Manual: React.FC<IProps> = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const open = () => setIsModalOpen(true)
    const close = () => setIsModalOpen(false)

    return <>
        <ManualButtonOpen onClick={open}/>
        <ManualModal onClose={close} isModalOpen={isModalOpen}/>
    </>

}
