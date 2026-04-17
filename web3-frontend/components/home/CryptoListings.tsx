'use client';
import {
  Box, Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const listings = [
  { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: '$43,521.00', change: '+2.4%', marketCap: '$851.2B', volume: '$28.4B', positive: true, color: '#F7931A', icon: '₿' },
  { rank: 2, name: 'Ethereum', symbol: 'ETH', price: '$2,847.32', change: '-0.8%', marketCap: '$342.1B', volume: '$15.2B', positive: false, color: '#627EEA', icon: 'Ξ' },
  { rank: 3, name: 'BNB', symbol: 'BNB', price: '$312.45', change: '+1.2%', marketCap: '$48.3B', volume: '$1.8B', positive: true, color: '#F3BA2F', icon: 'B' },
  { rank: 4, name: 'Solana', symbol: 'SOL', price: '$98.76', change: '+5.3%', marketCap: '$43.7B', volume: '$3.1B', positive: true, color: '#9945FF', icon: 'S' },
  { rank: 5, name: 'XRP', symbol: 'XRP', price: '$0.6234', change: '+3.1%', marketCap: '$33.8B', volume: '$2.4B', positive: true, color: '#00AAE4', icon: 'X' },
  { rank: 6, name: 'Cardano', symbol: 'ADA', price: '$0.4821', change: '-1.5%', marketCap: '$17.1B', volume: '$0.9B', positive: false, color: '#0033AD', icon: 'A' },
  { rank: 7, name: 'Avalanche', symbol: 'AVAX', price: '$34.56', change: '+4.2%', marketCap: '$14.2B', volume: '$0.7B', positive: true, color: '#E84142', icon: 'A' },
  { rank: 8, name: 'Dogecoin', symbol: 'DOGE', price: '$0.0821', change: '+8.7%', marketCap: '$11.7B', volume: '$1.2B', positive: true, color: '#C2A633', icon: 'Ð' },
];

export default function CryptoListings() {
  return (
    <Box sx={{ py: 10, background: 'linear-gradient(180deg, #050A14 0%, #080F1E 100%)' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ color: '#fff', fontWeight: 700, mb: 6, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
          Top Crypto Assets
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            background: 'rgba(13,27,42,0.8)',
            border: '1px solid rgba(0,230,118,0.1)',
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 0 14px rgba(255,255,255,0.05)',
            overflowX: 'auto',
          }}
        >
          <Table sx={{ minWidth: { xs: 480, sm: 'auto' } }}>
            <TableHead>
              <TableRow>
                {['#', 'Name', 'Price', '24h Change', 'Market Cap', 'Volume (24h)'].map((h, i) => (
                  <TableCell key={h} sx={{
                    color: '#8899AA', borderBottom: '1px solid rgba(255,255,255,0.06)', fontWeight: 600, fontSize: 13,
                    display: i >= 4 ? { xs: 'none', sm: 'table-cell' } : 'table-cell',
                  }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listings.map((coin) => (
                <TableRow
                  key={coin.symbol}
                  sx={{
                    '&:hover': { background: 'rgba(0,230,118,0.03)' },
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  <TableCell sx={{ color: '#8899AA', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 13 }}>
                    {coin.rank}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: coin.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
                      }}>
                        {coin.icon}
                      </Box>
                      <Box>
                        <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{coin.name}</Typography>
                        <Typography sx={{ color: '#8899AA', fontSize: 12 }}>{coin.symbol}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 14 }}>
                    {coin.price}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <Chip
                      icon={coin.positive ? <TrendingUpIcon sx={{ fontSize: 14 }} /> : <TrendingDownIcon sx={{ fontSize: 14 }} />}
                      label={coin.change}
                      size="small"
                      sx={{
                        background: coin.positive ? 'rgba(0,230,118,0.15)' : 'rgba(255,82,82,0.15)',
                        color: coin.positive ? '#00E676' : '#FF5252',
                        border: `1px solid ${coin.positive ? 'rgba(0,230,118,0.3)' : 'rgba(255,82,82,0.3)'}`,
                        fontWeight: 600,
                        '& .MuiChip-icon': { color: 'inherit' },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#8899AA', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 13, display: { xs: 'none', sm: 'table-cell' } }}>
                    {coin.marketCap}
                  </TableCell>
                  <TableCell sx={{ color: '#8899AA', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 13, display: { xs: 'none', sm: 'table-cell' } }}>
                    {coin.volume}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
