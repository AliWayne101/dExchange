import React from 'react'
import styles from '../style';
import { BsWhatsapp } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';

const Contact = () => {
  return (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bd-black-gradient-2 rounded-[20px] box-shadow`}>
      <div className='flex-1 flex flex-col'>
        <h2 className={styles.heading2}>Contact us</h2>
        <p className={`${styles.paragraph} max-w-[470] mt-5`}>We will be pleased to assist you, you can contact us using any of the button below.</p>
        <div className="mt-5 text-center flex justify-center text-white">
            
            <a href="http://wa.me/03173232354" target="_blank" rel="noopener noreferrer" className='mr-4'>
                <BsWhatsapp size={50} />
            </a>
            <a href={`mailto: alimalikwayne@gmail.com`} target="_blank" rel="noopener noreferrer">
                <AiOutlineMail size={50} />
            </a>
        </div>
      </div>
    </section>
  )
}

export default Contact