import React from 'react';
import { Card, CardMedia, Box, Container, Grid, TableContainer, TableCell, TableRow, TableHead, Table, TableBody, Button, Typography, Paper, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import styles from '../../../styles/Home.module.css';
import Image from 'next/image';

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <Image
                src="/car.png"
                alt="Logo"
                width={175}
                height={196}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
              my={8}
            >
              <Typography sx={{textAlign:'center', fontWeight:'700', color:'#FFFFFF'}}>
                Developed & Maintained By - <br/>
                <Image
                    src="/ERA-Logo.png"
                    alt="Picture of the author"
                    width={140}
                    height={40}
                    p={2}
                  /><br />
                ERA-InfoTech Ltd.
              </Typography>
            </Grid>
          </Grid>

        </Container>
      </footer>
    </>
  )
}

export default Footer
