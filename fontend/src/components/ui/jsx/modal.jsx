import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import '../css/modal.css'
import Image from '../../../assets/img2.png';
import Image2 from '../../../assets/img4.png';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

import Avatar from '../../../assets/img1.png';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
 import IconPicker from '../jsx/iconPick'

const ModalPost = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} className='button-comment'>
        <ModeCommentOutlinedIcon />
      </Button>
      <Modal

        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1180}
      >
        <div className='container'>  
          <div className='image'>
            <img className="picture" src={Image} alt="" /> 
            <img className="picture" src={Image2} alt="" /> 
          </div>
          <div className="comment-container">
            <div className="header">
              <div className="left-corner">
                <div className="img-header">
                  <img className='avatar' src={Avatar} alt="" />
                </div>

                <div className='text'>
                  <span className='username'>Alalo</span>

                </div>
              </div>
              <div className='right-corner' >
                <ListOutlinedIcon sx={{ fontSize: "30px" }}/>
              </div>
            </div>


            <div className='comment-container'>
              <div className='body' >
                <div className="img-bottom">
                  <img src={Avatar} className='avatar' alt="" />
                </div>
                <div className='text'>
                  <span className='username'>Alalo</span>
                  <p>Aloalo</p>
                  <div className="small">
                    <div>1m</div>
                    <div>See translation</div>
                  </div>
                </div>
                <div className="icon-heart"><FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }}/></div>
              </div>
            </div>
            <div className='comment-container'>
              <div className='body' >
                <div className="img-bottom">
                  <img src={Avatar} className='avatar' alt="" />
                </div>
                <div className='text'>
                  <span className='username'>Alalo</span>
                  <p>Aloalo</p>
                  <div className="small">
                    <div>1m</div>
                    <div>See translation</div>
                  </div>
                </div>
                <div className="icon-heart"><FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }}/></div>
              </div>
            </div>

            <div className='comment-container'>
              <div className='body' >
                <div className="img-bottom">
                  <img src={Avatar} className='avatar' alt="" />
                </div>
                <div className='text'>
                  <span className='username'>Alalo</span>
                  <p>Aloalo</p>
                  <div className="small">
                    <div>1m</div>
                    <div>See translation</div>
                  </div>
                </div>
                <div className="icon-heart"><FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }}/></div>
              </div>
            </div>

            <div className='comment-container'>
              <div className='body' >
                <div className="img-bottom">
                  <img src={Avatar} className='avatar' alt="" />
                </div>
                <div className='text'>
                  <span className='username'>Alalo</span>
                  <p>Aloalo</p>
                  <div className="small">
                    <div>1m</div>
                    <div>See translation</div>
                  </div>
                </div>
                <div className="icon-heart"><FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }}/></div>
              </div>
            </div>




            <div className="emotion">
              <div className="icon">

                <div className="icon-left">
                  <div className="heart">
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }}/>
                  </div>
                  <div className="comment">
                    <MapsUgcOutlinedIcon sx={{ fontSize: "30px" }}/>
                  </div>
                  <div className="share">
                    <ShareRoundedIcon sx={{ fontSize: "30px" }}/>
                  </div>
                </div>


                <div className='icon-right'>
                  <BookmarkBorderOutlinedIcon/>
                </div>

              </div>

              <div className='nof-like'>
                123456789 likes
              </div>
              <div className="date">
              <div>{`${new Date().toLocaleString('en-US', { month: 'long' })} ${new Date().getDate()}`}</div>
              </div>

            </div>
            <div className='add-comment'>
              <div className='button'>
                <div className='choose-icon'><IconPicker/></div>
                <div><input type="text" /></div>

              </div>
              <div className='post-addcomment'> post</div>

            </div>
          </div>
        </div>

      </Modal>
    </>
  );
};

export default ModalPost;