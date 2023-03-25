import { Avatar, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    minHeight: '50vh',
    bgcolor: 'white',
    borderRadius: 1,
    '&:focus': {
        outline: 'none'
    }
};

const ProfileModal = ({ open, handleClose, data }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 10 }}>
                    <CancelIcon color="error" onClick={handleClose} sx={{ cursor: 'pointer' }} />
                </div>
                <div style={{ padding: '15px 30px' }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        marginTop={2}
                    >
                        <b>

                            Driver's Profile

                        </b>
                    </Typography>
                    <Box
                        sx={{
                            marginTop: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            alt={data?.name}
                            src={`http://localhost:3000/${data?.image}`}
                            sx={{ width: 150, height: 150}}
                        />
                    </Box>
                    <div style={{ marginTop: 30 }}>
                        <Typography gutterBottom variant="h6" component="div">
                            <b>Name: </b>  {data?.first_name + " " + data?.last_name}
                        </Typography>
                    </div>
                    <div>
                        <Typography gutterBottom variant="h6" component="div">
                            <b>Phone Number: </b> {data?.phone_number}
                        </Typography>
                    </div>
                    <div>
                        <Typography gutterBottom variant="h6" component="div">
                            <b>School Year: </b> {data?.school_year}
                        </Typography>
                    </div>
                    <div>
                        <Typography gutterBottom variant="h6" component="div">
                            <b>Program: </b> {data?.program}
                        </Typography>
                    </div>
                    <div>
                        <Typography gutterBottom variant="h6" component="div">
                            <b>Birthday: </b> {data?.birthday}
                        </Typography>
                    </div>
                    <div>
                        <Typography gutterBottom variant="h6" component="div">
                            <b>Music Taste: </b> {data?.music_prefrence}
                        </Typography>
                    </div>
                    <div>
                        <Typography gutterBottom variant="h6" component="div">
                            <b>Bio: </b>
                            {data?.bio}
                        </Typography>
                    </div>

                </div>
            </Box>
        </Modal>
    )
}

export default ProfileModal