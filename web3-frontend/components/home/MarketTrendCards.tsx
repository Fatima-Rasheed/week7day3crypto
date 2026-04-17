'use client';

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import Image from 'next/image';

const baseCoins = [
  {
    symbol: 'BTC',
    name: 'BITCOIN',
    price: '$56,623.54',
    change: '1.41%',
    iconColor: '#F7931A',
    iconSrc: '/icon (3).png',
    curveImg: '/chart-state 1.png',
  },
  {
    symbol: 'ETH',
    name: 'ETHEREUM',
    price: '$4,267.90',
    change: '2.22%',
    iconColor: '#627EEA',
    iconSrc: '/icon (2).png',
    curveImg: '/tbh.png',
  },
  {
    symbol: 'BNB',
    name: 'BINANCE',
    price: '$587.74',
    change: '0.82%',
    iconColor: '#F3BA2F',
    iconSrc: '/icon (1).png',
    curveImg: '/BNB.png',
  },
  {
    symbol: 'USDT',
    name: 'TETHER',
    price: '$0.9998',
    change: '0.03%',
    iconColor: '#26A17B',
    iconSrc: '/icon (4).png',
    curveImg: '/eyc.png',
  },
];

// Repeat the 4 cards 4 times = 16 total
const marketData = [...baseCoins, ...baseCoins, ...baseCoins, ...baseCoins];

export default function MarketTrendCards() {
  return (
    <Box id="markets" sx={{ py: 10, background: 'transparent', position: 'relative', overflow: 'hidden' }}>

      {/* Glow — top-left */}
      <Box
        sx={{
          position: 'absolute',
          top: '-5%',
          left: '-8%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(71, 96, 82, 0.15) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Glow — bottom-right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '0%',
          right: '-5%',
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,100,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <Container maxWidth="lg">

        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            color: '#fff',
            fontWeight: 700,
            mb: 6,
            fontSize: { xs: '1.8rem', md: '2.2rem' },
          }}
        >
          Market Trend
        </Typography>

        {/* Grid */}
        <Grid container spacing={2}>
          {marketData.map((coin, index) => (
            <Grid
              key={`${coin.symbol}-${index}`}
              size={{ xs: 12, sm: 4, md: 3 }}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                sx={{
                  width: '100%',
                  minHeight: 187,
                  background: '#010010',
                  border: '4px solid #73FDAAB0',
                  borderRadius: '18px',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 0 12px rgba(255,255,255,0.06)',
                  '&:hover': {
                    border: '3px solid rgba(0,230,118,0.6)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.14), 0 8px 30px rgba(0,230,118,0.15)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: '18px 20px 18px 19px !important',
                    height: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >

                  {/* Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
                      
                      {/* Coin Icon */}
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: coin.iconColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          flexShrink: 0,
                          boxShadow: `0 0 8px ${coin.iconColor}66`,
                        }}
                      >
                        <Image
                          src={coin.iconSrc}
                          alt={coin.symbol}
                          width={22}
                          height={22}
                        />
                      </Box>

                      {/* Symbol + Name */}
                      <Box>
                        <Typography sx={{ color: '#fff', fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>
                          {coin.symbol}
                        </Typography>
                        <Typography sx={{ color: '#8899AA', fontSize: 9, lineHeight: 1.2 }}>
                          {coin.name}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Arrow */}
                    <Image
                      src="/Vector 3.png"
                      alt="trend arrow"
                      width={16}
                      height={16}
                    />
                  </Box>

                  {/* Price */}
                  <Typography
                    sx={{ color: '#fff', fontSize: { xs: 14, sm: 18 }, fontWeight: 700 }}
                  >
                    {coin.price}
                  </Typography>

                  {/* Bottom row */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography sx={{ color: '#00E676', fontSize: 12, fontWeight: 600 }}>
                      {coin.change}
                    </Typography>

                    <Box sx={{ position: 'relative', width: 80, height: 30 }}>
                      <Image
                        src={coin.curveImg}
                        alt={`${coin.symbol} trend`}
                        fill
                        style={{
                          objectFit: 'contain',
                          objectPosition: 'right center',
                        }}
                      />
                    </Box>
                  </Box>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}