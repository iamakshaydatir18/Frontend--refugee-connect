import { useRef, useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, IconButton, CardMedia } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Facebook, Twitter, LinkedIn, YouTube } from '@mui/icons-material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement,Tooltip,Legend } from 'chart.js';
 
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)
const ContentSection = () => {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  console.log(currentSlide);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <ArrowForwardIos />,
    prevArrow: <ArrowBackIos />,
    afterChange: (current : any) => setCurrentSlide(current)
  };

  // Sample pie chart data
  const pieChartData = {
    labels: ['Refugees in Camps', 'Refugees in Urban Areas', 'Refugees in Rural Areas', 'Refugees in Transit Centers', 'Refugees in Host Communities'],
    datasets: [{
      data: [3000000, 2000000, 1000000, 1500000, 2500000],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#ff8a65', '#8e24aa'],
      hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#ff8a65', '#8e24aa']
    }]
  };
  
const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: true,
    position: 'right'
  },
  title: {
    display: true,
    text: 'Distribution of Refugees by Location',
    fontSize: 16,
    fontColor: '#333'
  },
  tooltips: {
    enabled: true,
    mode: 'single',
    callbacks: {
      label: function(tooltipItem : any, data : any) {
        const dataset = data.datasets[tooltipItem.datasetIndex];
        const total = dataset.data.reduce((accumulator: any, currentValue: any) => accumulator + currentValue);
        const currentValue = dataset.data[tooltipItem.index];
        const percentage = Math.round((currentValue / total) * 100);
        return `${data.labels[tooltipItem.index]}: ${currentValue} (${percentage}%)`;
      }
    }
  }
};
  const {t} = useTranslation('common');
 
  const cultures = [
    {
      title: t('culturesTitle1'),
      description: t('culturesDescription1')
    },
    {
      title: t('culturesTitle2'),
      description: t('culturesDescription2')
    },
    {
      title: t('culturesTitle3'),
      description: t('culturesDescription3')
    },
    {
      title: t('culturesTitle4'),
      description: t('culturesDescription4')
    }
  ];
 
  const alternatingSections = [
    {
      title: t('alternatingSectionstitle1'),
      description: t('alternatingSectionsdescription1'),
      imageUrl: '../src/images/refugee_home1.jpg',
      imageFirst: true,
    },
    {
      title: t('alternatingSectionstitle2'),
      description: t('alternatingSectionsdescription2'),
      imageUrl: '../src/images/refugee_home2.jpg',
      imageFirst: false,
    },
  ];
 
  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext?.();
    }
  };
 
  const goToPrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev?.();
    }
  };
 
  return (
    <div style={{ overflowY: 'auto', maxHeight: '100vh', position: 'relative' }}>
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', filter: 'blur(1.5px)' }}>
        <img src="../src/images/refugee_main.jpg" alt="Refugee Thoughts" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <Typography variant="h5" style={{ fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'Verdana, sans-serif', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontSize: '48px', lineHeight: '1.2' }}>
          {t('MainHeader')}
        </Typography>
      </div>
    </section>
 
    <Container maxWidth="lg" style={{ padding: '40px 0' }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
      
       {/* First Set of Culture Cards */}
       <Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    <Typography variant="h4" gutterBottom style={{ borderRadius: '15px', backgroundColor: '#f0f0f0', padding: '10px', marginBottom: '20px' }}>
      {t('culturesHeader')}
    </Typography>
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Slider {...sliderSettings} ref={sliderRef}>
        {cultures.map((culture, index) => (
          <div key={index} style={{ minWidth: '300px', maxWidth: '400px', marginRight: '10px' }}>
            <Card style={{ boxShadow: 'none', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff', height: '100%' }}>
              <CardContent>
                <Typography variant="h5" style={{ color: '#333' }}>{culture.title}</Typography>
                <Typography variant="body2">{culture.description}</Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton onClick={goToPrevSlide}><ArrowBackIos /></IconButton>
        <IconButton onClick={goToNextSlide}><ArrowForwardIos /></IconButton>
      </div>
    </div>
  </Grid>
  <Grid item xs={12} md={6}>
    <div style={{
      padding: '20px',
      width: '100%',
      background: '#f0f0f0',
      height: '100%'
    }}>
      <Pie
        data={pieChartData}
        options={options}
      ></Pie>
    </div>
  </Grid>
</Grid>




        
      </Grid>
    </Container>
          {alternatingSections.map((section, index) => (
        <Container key={index} maxWidth="lg" style={{ padding: '40px 0' }}>
          <Grid container spacing={4} alignItems="center" direction={section.imageFirst ? 'row' : 'row-reverse'}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={section.imageUrl}
                alt={section.title}
                style={{ width: '100%', height: 'auto' }}
              />
            </Grid>
            <Grid item xs={12} md={6} style={{ color: '#000', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" gutterBottom>
                {section.title}
              </Typography>
              <Typography variant="body1">
                {section.description}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      ))}
 
      <footer style={{ backgroundColor: '#000', color: '#fff', padding: '40px 0', width: '100%' }}>
        <Container maxWidth="lg">
          <Grid container spacing={5} justifyContent="space-between" alignItems="center">
            
            {/* Support our work section */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                {t('footerSupport')}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t('footerHelp')}
              </Typography>
              <Button variant="outlined" color="inherit">
                {t('footerDonate')}
              </Button>
            </Grid>
            
            {/* Global Voices for Refugee section */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                {t('footerVoices')}
              </Typography>
              <IconButton color="inherit"><Facebook /></IconButton>
              <IconButton color="inherit"><Twitter /></IconButton>
              <IconButton color="inherit"><LinkedIn/></IconButton>
              <IconButton color="inherit"><YouTube/></IconButton>
            </Grid>
            
            {/* Stay informed section */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                {t('footerStay')}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t('footerSignUp')}
              </Typography>
              <Button variant="outlined" color="inherit">
                {t('footerSubscribe')}
              </Button>
            </Grid>
            
          </Grid>
          <Typography variant="caption" align="center" display="block" gutterBottom style={{ marginTop: '20px', borderTop: '1px solid #fff', paddingTop: '20px' }}>
            {t('footerPrivacy')}
            <br />
            © RefugeeConnect 2024
          </Typography>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img src="../src/images/logo.png" alt="Your Logo" style={{ height: '50px', width: 'auto' }} />
          </div>
        </Container>
      </footer>
    </div>
  );
};
 
export default ContentSection;
