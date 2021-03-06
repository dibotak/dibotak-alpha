import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Card from '../components/Card'
import Modal from '../components/Modal'
import DInput from '../components/DInput'
import logo from '../public/Dib.png'

export default function Home({ data, authors }: any) {
  // useEffect(() => {
  //   console.log(data)
  // })
  const [modalForm, setModalForm] = useState(false)
  const [modalSuccess, setModalSuccess] = useState(false)
  const [modalError, setModalError] = useState(false)
  const [borrowInfo, setBorrowInfo] = useState({ name: '', email: '', phoneNumber: '', book: '' })
  const [isLoading, setIsLoading] = useState(false)

  function modalBook(bookId: string | number) {
    console.log(bookId)
    setBorrowInfo({ ...borrowInfo, book: String(bookId) })
    setModalForm(true)
  }
  function closeModal() {
    setModalForm(false)
    setBorrowInfo({ name: '', email: '', phoneNumber: '', book: '' })
  }
  function submitBorrow(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    console.log(borrowInfo)
    setIsLoading(true)
    fetch('https://api.dibotak.com/borrowers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(borrowInfo)
    })
      .then((res: any) => res.json())
      .then((data: any) => {
        console.log(data)
        closeModal()
        setIsLoading(false)
        if (data.statusCode >= 400) {
          setModalError(true)
        } else {
          setModalSuccess(true)
        }
      })
      .catch((err: any) => {
        console.log('come to error catch')
        closeModal()
        setIsLoading(false)
      })
  }
  function changeBorrowInfo(key: string, value: string) {
    setBorrowInfo({ ...borrowInfo, [key]: value })
  }
  return (
    <div className="">
      <Head>
        <title>DiBotak</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" /> 
      </Head>

      <nav className="flex w-full bg-blue-100 px-8 py-3 justify-between items-center">
        <div>
          <Image src={logo} alt="DiBotak" width="40px" height="40px" />
        </div>
        <div>
          <a href="#">Home</a>
        </div>
      </nav>

      <main className="w-full pb-5">
        <div className="px-5 lg:px-20 py-2">
          <h3 className="text-xl font-bold">Laboratorium tempat kamu bereksperimen.</h3>
          <p>Laboratorium ini masih dalam tahap pembangunan, tapi perpustakaannya sudah bisa diakses. Penjelasan tentang lab ini akan hadir sesegera mungkin, terimakasih!.</p>
        </div>
        <div className="px-5 lg:px-20">
          <h3 className="text-xl font-bold">Perpustakaan</h3>
          <p className="pb-3">Pinjam buku dengan mudah disini.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto" style={{maxWidth: '800px'}}>
            {data.map((book: any, i: number) => (
              <Card title={book.title} subtitle={book.authors[0].name} key={'book-'+i}
                action={() => modalBook(book.id)}
                imgUrl={book.cover.url + '?tr=h-250'}
              />
            ))}
          </div>
        </div>
        <Modal show={modalForm} title="Form Peminjaman Buku" close={closeModal}>
          <p className="pb-5">Judul: {data.filter((el: any) => el.id == borrowInfo.book)[0]?.title}</p>
          <form onSubmit={submitBorrow} style={{ maxWidth: '320px' }} className="mx-auto pb-5">
            <DInput
              label="Nama"
              id="name"
              onChange={(ev:React.FormEvent<HTMLInputElement>) => changeBorrowInfo('name', ev.currentTarget.value)}
              value={borrowInfo.name}
            />
            <DInput
              label="Email"
              id="email"
              type="email"
              onChange={(ev:React.FormEvent<HTMLInputElement>) => changeBorrowInfo('email', ev.currentTarget.value)}
              value={borrowInfo.email}
            />
            <DInput
              label="Nomor Telepon"
              id="phoneNumber"
              onChange={(ev:React.FormEvent<HTMLInputElement>) => changeBorrowInfo('phoneNumber', ev.currentTarget.value)}
              value={borrowInfo.phoneNumber}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-800 rounded-md px-2 py-1 text-white"
              >Pinjam Buku</button>
            </div>
          </form>
        </Modal>
        <Modal show={modalError} title="Terjadi Kesalahan" close={() => setModalError(false)}>
          <div>
            <p>Terjadi kesalahan</p>
          </div>
        </Modal>
        <Modal show={modalSuccess} title="Berhasil!" close={() => setModalSuccess(false)}>
          <div className="p-4">
            <p>Untuk tahap selanjutnya, Kamu akan dihubungi via email / whatsapp dalam 1x24 jam.</p>
          </div>
        </Modal>
        {isLoading && 
          <div className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-25 z-50">
            <div className="absolute bg-white shadow-sm rounded-sm mx-auto flex items-center"
              style={{width: '200px', height: '50px', top: 'calc(50% - 50px)', left: 'calc(50% - 100px)'}}
            >
              <p className="py-2 text-center w-full">Mohon tunggu ...</p>
            </div>
          </div>
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('https://api.dibotak.com/books')
  const data: any = await res.json()
  const resAuthors = await fetch('https://api.dibotak.com/authors')
  const authors = await resAuthors.json()

  return {
    props: {
      data,
      authors,
    }
  }
}
