 

const Toast = ({msg, handleShow, bgColor}) => {
  return (
    <div className='toast' style={{position:'fixed',padding:'1rem',borderRadius:'5px',backgroundColor:`${bgColor}`,color:'white', top:'5px', right:'5px', zIndex:'50', minWidth:'230px'}}>
      <div style={{display:'flex', alignItems:'center',justifyContent:'space-batween',gap:'160px', borderBottom:'1px solid white',padding:'0rem .5rem'}} className='toast-header'>
        <h5 style={{fontWeight:'600'}}>{msg.title}</h5>
        <p  onClick={handleShow} style={{fontSize:'1.5rem'}}>&times;</p>
      </div>
      <div style={{padding:'0rem .5rem'}} className='toast-body'>
        <p>{msg.body}</p>
      </div>
    </div>
  )
}

export default Toast
