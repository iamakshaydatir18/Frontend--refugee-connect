
import React, { useEffect, useState } from 'react';
import { Container, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { removeStoryAsync, getAllStoryAsync } from '../store/story/story-reducer-actions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'; // Import AppDispatch



// Define the Story interface
export interface Story {
    storyId: string;
    refugeeId: string;
    title: string;
    description: string;
    image: string;
}

const UserStories: React.FC = () => {
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const role = localStorage.getItem('role');
    const personId = localStorage.getItem('personId');

    const story = useSelector((state: RootState) => state.story.userStories); 
    console.log("story is ",story);
    
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch here

    useEffect(() => {
        const fetchAllStory = async () => {
            await dispatch(getAllStoryAsync());
        };
    
        fetchAllStory();
    }, [dispatch]);

    const handleModalDelete = (storyId: string) => {
        const fetchAllStory = async () => {
            await dispatch(removeStoryAsync(storyId));
            setSelectedStory(null);
        };
      
        fetchAllStory();
    }

    const ArrowBackIos = ({ className, style, onClick }: any) => (
        <div
            className={className}
            style={{
                ...style,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                zIndex: 1,
                margin: '0px 10px 0px 0px',
                cursor: 'pointer',
            }}
            onClick={onClick}
        >
            &larr;
        </div>
    );

    const ArrowForwardIos = ({ className, style, onClick }: any) => (
        <div
            className={className}
            style={{
                ...style,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                zIndex: 1,
                margin: '0px 0px 0px -30px',
                cursor: 'pointer',
            }}
            onClick={onClick}
        >
            &rarr;
        </div>
    );

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <ArrowForwardIos />,
        nextArrow: <ArrowBackIos />,
    };

    const handleStoryClick = (story: Story) => {
        setSelectedStory(story);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedStory(null);
    };

    const truncateDescription = (description: string): string => {
        const words = description.split(' ');
        if (words.length > 10) {
            return words.slice(0, 10).join(' ') + '...';
        }
        return description;
    };

    return (
        <div style={{ width: '100%', backgroundColor: 'white' }}>
            <div style={{ textAlign: 'center' }}>
                <section style={{ padding: '40px' }}>
                    <Container>
                        <Typography
                            variant="h4"
                            gutterBottom
                            style={{ fontWeight: 'bold', color: 'black' }}
                        >
                            Our Top User Stories
                        </Typography>

                        <Slider {...sliderSettings}>
                            {story.map((story : any, index : any) => (
                                <div
                                    key={index}
                                    onClick={() => handleStoryClick(story)}
                                    style={{
                                        cursor: 'pointer',
                                        marginRight: '0px',
                                        marginLeft: '0px',
                                        padding: '10px',
                                        transition: 'transform 0.3s ease', // Apply transition for smooth scaling
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)', e.currentTarget.style.zIndex = '5000' }} // Enlarge the user story on hover
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)', e.currentTarget.style.zIndex = '1' }} // Reset scale on mouse leave
                                >
                                    <img
                                        src={`http://localhost:4000/${story.image}`}
                                        alt={story.title}
                                        style={{
                                            width: '90%',
                                            height: '200px', // Fixed height for all images
                                            cursor: 'pointer',
                                            borderRadius: '10px',
                                            objectFit: 'cover', // Maintain aspect ratio and fill the width and height
                                        }}
                                    />
                                    <div style={{ cursor: 'pointer' }}>
                                        <Typography
                                            variant="h5"
                                            style={{ width: '90%' , fontSize: '20px', fontWeight: 'bold' }}
                                        >
                                            {story.title}
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            style={{ width: '90%' , fontSize: '16px' }}
                                        >
                                            {truncateDescription(story.description)}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </Container>
                </section>

                {/* Modal */}
                {selectedStory && (
                    <Dialog open={isModalOpen} onClose={handleModalClose} fullWidth maxWidth="md">
                        <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            {selectedStory.title}
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                                {/* Left column for the image */}
                                <Grid item xs={6}>
                                    <img src={`http://localhost:4000/${selectedStory.image}`} alt={selectedStory.title} style={{ width: '100%' }} />
                                </Grid>
                                {/* Right column for the title and description */}
                                <Grid item xs={6}>
                                    {/* Display the full description */}
                                    <Typography variant="body1" dangerouslySetInnerHTML={{ __html: selectedStory.description }} />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                        { (role === 'admin' || personId === selectedStory.refugeeId ) &&  <Button onClick={() => handleModalDelete(selectedStory.storyId)} color="primary">
                                Delete
                            </Button> }
                            <Button onClick={handleModalClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </div>
        </div>
    );
};

export default UserStories;
