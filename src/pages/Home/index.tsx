import { Box, Button, Table, TableBody, TableHead, TableRow, TextareaAutosize, Typography } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

import WrapAuthForm from '../../components/Authentication/WrapAuthForm'
import { useEffect } from 'react'
import axios from 'axios'
import { BookItem } from '../../redux/types'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Swal from 'sweetalert2'

function Home() {
  const isLogin = useSelector((state: RootState) => state.user.isLogin)

  const [bookList, setBookList] = useState<BookItem[] | []>([])

  const getBookData = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/book/get_all_book/',
        headers: {
          'Content-Type': `application/json`
        }
      })

      const bookList_tmp = res.data.data.map((item: any) => ({ ...item, category: item.category.name }))
      setBookList(bookList_tmp)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getBookData()
  }, [])

  const convertDate = (date: string) => {
    const parts = date.split('-')
    const outputDate = `${parts[2]}-${parts[1]}-${parts[0]}`
    return outputDate
  }

  const deleteBook = async (id: number | undefined) => {
    try {
      const res = await axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/book/delete_book/${id}/`,
        headers: {
          'Content-Type': `application/json`
        }
      })

      getBookData()
    } catch (e) {}
  }

  const handleDeleteBook = (id: number | undefined) => {
    Swal.fire({
      icon: 'question',
      title: `Do you want to delete this book`,
      showCancelButton: true,
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(id)
      }
    })
  }

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 95%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    background: #F0F0F0
    outline: none;
    border: 1px solid #A4A4A4;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 1px #1976D2;
    }
  `
  )

  const nav = useNavigate()
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#2dafda',
      color: theme.palette.common.white,
      fontWeight: 'bold',
      fontSize: 16
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }))

  const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: '24px'
  }))
  return (
    <>
      <Typography align='center' variant='h1' sx={{ fontSize: '40px' }}>
        List Book
      </Typography>
      {isLogin && (
        <Box sx={{ mr: '3rem' }} display={'flex'} justifyContent={'flex-end'}>
          <Button variant='outlined' startIcon={<AddCircleOutlineIcon />} onClick={() => nav('/book/add')}>
            Add Book
          </Button>
        </Box>
      )}

      <StyledTableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Tiêu đề</StyledTableCell>
              <StyledTableCell>Tác giả</StyledTableCell>
              <StyledTableCell>Thể loại</StyledTableCell>
              <StyledTableCell>Ngày phát hành</StyledTableCell>
              <StyledTableCell>Số trang</StyledTableCell>
              <StyledTableCell>Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookList.map((book, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCell>{book.title}</StyledTableCell>
                <StyledTableCell>{book.author}</StyledTableCell>
                <StyledTableCell>{book.category}</StyledTableCell>
                <StyledTableCell>{convertDate(book.public_date)}</StyledTableCell>
                <StyledTableCell>{book.page_num}</StyledTableCell>
                {isLogin && (
                  <TableCell sx={{ width: '200px' }}>
                    <Button variant='contained' sx={{ mr: 1 }} onClick={() => nav(`/book/${book.id}/detail`)}>
                      View
                    </Button>
                    <Button variant='contained' color='error' onClick={() => handleDeleteBook(book.id)}>
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <WrapAuthForm />
    </>
  )
}

export default Home
