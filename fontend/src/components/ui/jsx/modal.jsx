import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import '../css/modal.css'
import Image from '../../../assets/img4.png';
import Avatar from '../../../assets/img1.png';
const ModalPost = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        <ModeCommentOutlinedIcon />
      </Button>
      <Modal

        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <div className='container'>
          <div className='image'>
            <img className="picture" src={Image} alt="" />
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
                icon
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
                <div className="icon-heart">Heart</div>
              </div>
            </div>



            <div className="emotion">
              <div className="icon">

                <div className="icon-left">
                  <div className="heart">
                    heart
                  </div>
                  <div className="comment">
                    comment
                  </div>
                  <div className="share">
                    share
                  </div>
                </div>


                <div className='icon-right'>
                  save
                </div>

              </div>

              <div className='nof-like'>
                123456789 likes
              </div>
              <div className="date">
                <div>{`${new Date().getMonth()} ${new Date().getDay()}`}</div>


              </div>

            </div>
              <div className='add-comment'>
                <div className='button'>
                <div className='choose-icon'>Icon</div>
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