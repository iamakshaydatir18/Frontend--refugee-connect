
import { Container, Typography, Button, Grid, Box, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, YouTube } from '@mui/icons-material';

export default function Footer(){

    

    return (<>
    <Box component="footer" sx={{ bgcolor: 'black', color: 'white', py: 4, mt: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={5} justifyContent="space-between" alignItems="center">
            {/* Support our work section */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Support our work
              </Typography>
              <Typography variant="body2" paragraph>
                Please help refugees in need.
              </Typography>
              <Button variant="outlined" color="inherit" /*onClick={() => handleResourceClick('donate')}*/>
                Donate now
              </Button>
            </Grid>

            {/* Global Voices for Refugee section */}
            <Grid item xs={12} sm={6} md={3}>
              <IconButton color="inherit"><Facebook /></IconButton>
              <IconButton color="inherit"><Twitter /></IconButton>
              <IconButton color="inherit"><LinkedIn /></IconButton>
              <IconButton color="inherit"><YouTube /></IconButton>
            </Grid>

            {/* Stay informed section */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Stay informed
              </Typography>
              <Typography variant="body2" paragraph>
                Sign up to our newsletter to learn more about people forced to flee and how you can support them.
              </Typography>
              <Button variant="outlined" color="inherit"  /*onClick={() => handleResourceClick('donate')}*/>
                Subscribe
              </Button>
            </Grid>
          </Grid>
          <Typography variant="caption" align="center" display="block" gutterBottom sx={{ mt: 2, borderTop: '1px solid #fff', pt: 2 }}>
            Privacy policy | Terms and conditions of use | Copyright
            <br />
            © RefugeeConnect 2024
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <img src="../src/images/logo.png" alt="RefugeeConnect Logo" style={{ height: '50px', width: 'auto' }} />
          </Box>
        </Container>
      </Box>
    </>)
}