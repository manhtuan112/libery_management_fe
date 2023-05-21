import {
  Box,
  Button,
  Card,
  CardMedia,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography
} from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { Params, useNavigate, useParams } from 'react-router-dom'
import { TextareaAutosizeProps } from '@mui/material/TextareaAutosize'
// import { styled } from '@mui/system'
import axios from 'axios'
import Swal from 'sweetalert2'
import Loading from '../Loading'
import { BookItem } from '../../redux/types'
import { styled } from '@mui/material/styles'
import EmptyTextarea from './TextArea'

function Detail() {
  const [status, setStatus] = useState('')
  const [bookInfo, setBookInfo] = useState()

  const [isLoading, setIsLoading] = useState(false)

  const [image, setImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<any>(null)

  const [imageUrl, setImageUrl] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  // const description = useRef<HTMLTextAreaElement>(null)
  const [description, setDescription] = useState('')

  const [public_date, setPublic_date] = useState('')
  const [page_num, setPage_num] = useState('')
  const [category, setCategory] = useState('Khác')

  const [showAuthorError, setshowAuthorError] = useState(false)
  const [showTitleError, setshowTitleError] = useState(false)
  const [showPublicdateError, setshowPublicdateError] = useState(false)

  const { id }: Readonly<Params<string>> = useParams()
  const nav = useNavigate()




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

  useEffect(() => {
    if (id) {
      // xử lí phần xem sách
      handelViewBook(id)
      setStatus('view')
    } else {
      setStatus('add')
    }
  }, [])

  useEffect(() => {
    // localStorage.setItem
    return () => {
      image && URL.revokeObjectURL(image)
      //do khi lấy ảnh lần đầu thì avatar là rỗng nên hàm cleanup sẽ lỗi(cần dùng đkien)
    }
  }, [image])

  const handlePreviewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files // get the selected files

    if (files != null && files.length > 0) {
      let file = files[0] //them thuoc tinh multiple cho phép chọn nhiều ảnh
      // URL.createObjectURL tạo ra url tạo trong trình duyệt
      setImageFile(file)

      const preview = URL.createObjectURL(file)
      setImage(preview)
      //Nếu không dùng useEffect thì khi đổi ảnh thì ảnh cũ vẫn lưu trong bộ nhớ của trình duyệt(chỉ mất đi khi tắt trình duyệt)
      //dần đến tràn memory leak
      console.log(preview)
      //khi chọn nhiều lần 1 ảnh (trong khi comment fb thì nhiều comment 1 ảnh) thì cần cho value về null để lần sau có thể vào trong hàm onChange
      e.target.value = ''
    } else {
      setImage(null) // clear the selected file if no files are selected
    }
  }

  const handelViewBook = async (id: string) => {
    try {
      const res = await axios({
        method: 'get',
        url: `http://127.0.0.1:8000/book/get_book/${id}/`,
        headers: {
          'Content-Type': `application/json`
        }
      })

      const data = res.data.data
      setTitle(data.title)
      setAuthor(data.author)

      setDescription(data.description)
      setPublic_date(data.public_date)
      setPage_num(data.page_num)
      setCategory(data.category.name)
      setImageUrl(data.image_url)
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Not found book',
        confirmButtonText: 'Yes'
      })
    }
  }

  const handleUploadBook = async (id: string | undefined, data: any) => {
    if (id) {
      try {
        const res = await axios({
          method: 'put',
          url: `http://127.0.0.1:8000/book/update_book/${id}/`,
          data: JSON.stringify(data),
          headers: {
            'Content-Type': `application/json`
          }
        })

        setIsLoading(false)
        Swal.fire({
          icon: 'success',
          title: 'Update Book Success'
        })
      } catch (e) {
        setIsLoading(false)
        Swal.fire({
          icon: 'error',
          title: 'Update Book Failed',
          confirmButtonText: 'Yes'
        })
      }
      setStatus('view')
    } else {
      try {
        const res = await axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/book/add_book/',
          data: JSON.stringify(data),
          headers: {
            'Content-Type': `application/json`
          }
        })

        setIsLoading(false)
        Swal.fire({
          icon: 'success',
          title: 'Add Book Success',
          confirmButtonText: 'Yes',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            nav('/')
          }
        })
      } catch (e) {
        console.log(JSON.stringify(data))
        setIsLoading(false)
        Swal.fire({
          icon: 'error',
          title: 'Add Book Failed',
          confirmButtonText: 'Yes'
        })
      }
    }
  }

  const handleAddBook = async (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    if (!imageFile) {
      // không tải ảnh lên
      if (!author.trim() || !public_date || !title.trim()) {
        if (author.trim()) setshowAuthorError(false)
        else setshowAuthorError(true)

        if (title.trim()) setshowTitleError(false)
        else setshowTitleError(true)

        if (public_date) setshowPublicdateError(false)
        else setshowPublicdateError(true)
      } else {
        const data: BookItem = {
          title,
          author,
          public_date,
          category
        }
        if (description.trim()) data['description'] = description
        if (page_num) data['page_num'] = parseInt(page_num)
        setIsLoading(true)
        handleUploadBook('', data)
      }
    } else {
      // xử lí khi tải ảnh lên

      if (!author.trim() || !public_date || !title.trim()) {
        if (author.trim()) setshowAuthorError(false)
        else setshowAuthorError(true)

        if (title.trim()) setshowTitleError(false)
        else setshowTitleError(true)

        if (public_date) setshowPublicdateError(false)
        else setshowPublicdateError(true)
      } else {
        const data: BookItem = {
          title,
          author,
          public_date,
          category
        }
        if (description.trim()) data['description'] = description
        if (page_num) data['page_num'] = parseInt(page_num)
        setIsLoading(true)
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('upload_preset', 'imagelisttest')
        formData.append('api_key', '144543675463974')
        try {
          const res = await axios({
            method: 'post',
            url: 'https://api.cloudinary.com/v1_1/diemquynhpham01/image/upload',
            data: formData,
            headers: {
              'Content-Type': `multipart/form-data`
            }
          })

          setImageUrl(res.data.url)
          data['image_url'] = res.data.url
          handleUploadBook('', data)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  const handleUpdateBook = async () => {
    if (!author.trim() || !public_date || !title.trim()) {
      if (author.trim()) setshowAuthorError(false)
      else setshowAuthorError(true)

      if (title.trim()) setshowTitleError(false)
      else setshowTitleError(true)

      if (public_date) setshowPublicdateError(false)
      else setshowPublicdateError(true)
    } else {
      const data: BookItem = {
        title,
        author,
        public_date,
        category
      }
      if (description.trim()) data['description'] = description
      if (page_num) data['page_num'] = parseInt(page_num)
      setIsLoading(true)
      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('upload_preset', 'imagelisttest')
        formData.append('api_key', '144543675463974')
        try {
          const res = await axios({
            method: 'post',
            url: 'https://api.cloudinary.com/v1_1/diemquynhpham01/image/upload',
            data: formData,
            headers: {
              'Content-Type': `multipart/form-data`
            }
          })

          setImageUrl(res.data.url)
          data['image_url'] = res.data.url
          handleUploadBook(id, data)
        } catch (e) {
          console.log(e)
        }
      } else {
        data['image_url'] = imageUrl
        handleUploadBook(id, data)
      }
    }
  }
  

  return (
    <>
      {isLoading && <Loading />}

      <Typography align='center' variant='h1' sx={{ fontSize: '40px' }}>
        Book
      </Typography>
      <Box sx={{ display: 'flex', mt: 3 }} component='form'>
        <Box sx={{ flex: 2 }}>
          <Box sx={{ display: 'flex' }}>
            <FormGroup sx={{ flex: '1', mr: 3 }}>
              <InputLabel htmlFor='title'>Tiêu đề *</InputLabel>
              <TextField
                error={showTitleError}
                helperText={showTitleError ? 'Not empty this field' : ''}
                disabled={status === 'view'}
                required
                id='title'
                variant='filled'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>

            <FormGroup sx={{ flex: '1' }}>
              <InputLabel htmlFor='author'>Tác giả *</InputLabel>
              <TextField
                id='author'
                error={showAuthorError}
                helperText={showAuthorError ? 'Not empty this field' : ''}
                disabled={status === 'view'}
                variant='filled'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </FormGroup>
          </Box>

          <Box sx={{ display: 'flex', mt: 1 }}>
            <FormGroup sx={{ flex: '1' }}>
              <InputLabel htmlFor='description'>Mô tả về sách</InputLabel>
              
              <EmptyTextarea description={description} setDescription={setDescription} status={status} />
            </FormGroup>
          </Box>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <FormGroup sx={{ flex: '1', mr: 3 }}>
              <InputLabel htmlFor='public_date'>Ngày phát hành *</InputLabel>
              <TextField
                disabled={status === 'view'}
                name='public_date'
                error={showPublicdateError}
                helperText={showPublicdateError ? 'Not empty this field' : ''}
                type='date'
                variant='filled'
                value={public_date}
                onChange={(e) => setPublic_date(e.target.value)}
                id='public_date'
              />
            </FormGroup>

            <FormGroup sx={{ flex: '1' }}>
              <InputLabel htmlFor='page_num'>Số trang</InputLabel>
              <TextField
                disabled={status === 'view'}
                type='number'
                id='page_num'
                variant='filled'
                value={page_num}
                onChange={(e) => setPage_num(e.target.value)}
              />
            </FormGroup>
          </Box>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <FormGroup sx={{ flexBasis: '50%' }}>
              <InputLabel htmlFor='page_num'>Thể loại</InputLabel>
              <Select value={category} onChange={(e) => setCategory(e.target.value)} disabled={status === 'view'}>
                <MenuItem value='Khác' selected>
                  Khác
                </MenuItem>
                <MenuItem value='Giáo dục'>Giáo dục</MenuItem>
                <MenuItem value='Giải trí'>Giải trí</MenuItem>
                <MenuItem value='Văn học nước ngoài'>Văn học nước ngoài</MenuItem>
              </Select>
            </FormGroup>
          </Box>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Button variant='contained' component='label' disabled={status === 'view'}>
              Upload
              <input hidden accept='image/*' type='file' onChange={handlePreviewAvatar} />
            </Button>
          </Box>
          {(image || imageUrl) && (
            <Card sx={{ flex: 1, ml: 4, maxHeight: '400px' }}>
              <CardMedia
                component='img'
                sx={{ objectFit: 'contain' }}
                height={'100%'}
                image={image || imageUrl}
                title='title'
              />
            </Card>
          )}
        </Box>
      </Box>
      <Box sx={{ textAlign: 'end' }}>
        {status === 'add' && (
          <Button variant='contained' component='label' color='success' onClick={handleAddBook}>
            Add
          </Button>
        )}
        {status === 'view' && (
          <Button variant='contained' component='label' color='warning' onClick={() => setStatus('update')}>
            Update
          </Button>
        )}
        {status === 'update' && (
          <Button variant='contained' component='label' color='error' onClick={handleUpdateBook}>
            Save
          </Button>
        )}
      </Box>
    </>
  )
}

export default Detail
