// --- 1. SISTEM KEAMANAN (LOGIN CHECK) ---
// Cek halaman mana yang sedang dibuka
const currentPage = window.location.pathname;
const isLoginPage = currentPage.includes('login.html');
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// Proteksi Halaman: Kalau belum login tapi maksa buka index/history -> Kembali ke Login
if (!isLoggedIn && !isLoginPage) {
    window.location.href = 'login.html';
}

// Kalau sudah login tapi buka halaman login -> Lempar ke Dashboard
if (isLoggedIn && isLoginPage) {
    window.location.href = 'index.html';
}

// --- 2. LOGIKA LOGIN (Hanya jalan di halaman login) ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const errorMsg = document.getElementById('errorMsg');

        // Username & Password Hardcoded (DEMO)
        if (user === 'admin' && pass === '123') {
            localStorage.setItem('isLoggedIn', 'true'); // Simpan tiket masuk
            window.location.href = 'index.html'; // Pindah ke dashboard
        } else {
            errorMsg.style.display = 'block'; // Munculkan pesan error
        }
    });
}

// --- 3. LOGIKA LOGOUT ---
function logout() {
    if(confirm("Yakin ingin keluar?")) {
        localStorage.removeItem('isLoggedIn'); // Hapus tiket
        window.location.href = 'login.html'; // Balik ke login
    }
}


if (!isLoginPage) {
    
    // DOM SELECTION
    const tradeForm = document.getElementById('tradeForm');
    const tradeList = document.getElementById('tradeList');
    const historyList = document.getElementById('historyList');
    const totalPortfolioEl = document.getElementById('totalPortfolio');
    const totalProfitEl = document.getElementById('totalProfit');
    const emptyState = document.getElementById('emptyState');
    const emptyHistory = document.getElementById('emptyHistory');
    const checkPriceBtn = document.getElementById('checkPriceBtn');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // STATE
    let trades = JSON.parse(localStorage.getItem('cryptoTrades')) || [];
    let history = JSON.parse(localStorage.getItem('cryptoHistory')) || [];
    let profitBalance = 0;

    // INIT
    document.addEventListener('DOMContentLoaded', () => {
        calculateStats();
        renderUI();
        
        // Tambah Tombol Logout ke Header secara otomatis via Javasript
        const navContainer = document.querySelector('.nav-container');
        if(navContainer) {
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'logout-btn';
            logoutBtn.innerHTML = '🔒 Logout';
            logoutBtn.onclick = logout;
            navContainer.appendChild(logoutBtn);
        }
    });

    // UTILS & FUNCTIONS
    function formatRupiah(angka) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
    }
    function getCurrentDate() {
        const now = new Date();
        return now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + " " + now.toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'});
    }

    function calculateStats() {
        const totalHoldings = trades.reduce((acc, curr) => acc + curr.total, 0);
        profitBalance = history.reduce((acc, curr) => acc + curr.profit, 0);

        if(totalPortfolioEl) totalPortfolioEl.textContent = formatRupiah(totalHoldings);
        if(totalProfitEl) {
            totalProfitEl.textContent = formatRupiah(profitBalance);
            totalProfitEl.style.color = profitBalance >= 0 ? '#22d3ee' : '#ef4444';
        }
    }

    function saveData() {
        localStorage.setItem('cryptoTrades', JSON.stringify(trades));
        localStorage.setItem('cryptoHistory', JSON.stringify(history));
        calculateStats();
        renderUI();
    }

    function renderUI() {
        // Logic Render Tabel Holding (Index)
        if (tradeList) {
            tradeList.innerHTML = '';
            if (trades.length === 0) emptyState.classList.remove('hidden');
            else {
                emptyState.classList.add('hidden');
                trades.forEach((trade, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td style="font-weight: bold; color: #c084fc; text-transform: capitalize;">${trade.coin}</td>
                        <td>${formatRupiah(trade.price)}</td>
                        <td>${trade.amount}</td>
                        <td style="color: #cbd5e1;">${formatRupiah(trade.total)}</td>
                        <td style="display:flex; gap:5px;">
                            <button class="sell-btn" onclick="sellTrade(${index})">Jual</button>
                            <button class="delete-btn" onclick="deleteTrade(${index})">Hapus</button>
                        </td>
                    `;
                    tradeList.appendChild(row);
                });
            }
        }

        // Logic Render Tabel History (Laporan)
        if (historyList) {
            historyList.innerHTML = '';
            if (history.length === 0) emptyHistory.classList.remove('hidden');
            else {
                emptyHistory.classList.add('hidden');
                [...history].reverse().forEach((item, index) => {
                    const realIndex = history.length - 1 - index;
                    const profitClass = item.profit >= 0 ? '#22d3ee' : '#ef4444';
                    const sign = item.profit >= 0 ? '+' : '';
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td style="font-size: 0.85rem; color: #94a3b8;">${item.date}</td>
                        <td style="font-weight: bold; text-transform: capitalize;">${item.coin}</td>
                        <td style="color: #f59e0b; font-size: 0.8rem;">JUAL</td>
                        <td>${item.amount}</td>
                        <td>${formatRupiah(item.sellPrice)}</td>
                        <td style="color: ${profitClass}; font-weight: bold;">${sign}${formatRupiah(item.profit)}</td>
                        <td><button class="delete-btn" style="padding:4px 8px; font-size:0.7rem;" onclick="deleteHistory(${realIndex})">×</button></td>
                    `;
                    historyList.appendChild(row);
                });
            }
        }
    }

    // Event Listeners
    if (tradeForm) {
        tradeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const coin = document.getElementById('coinName').value.toUpperCase();
            const price = parseFloat(document.getElementById('buyPrice').value);
            const amount = parseFloat(document.getElementById('amount').value);
            if(coin && price && amount) {
                trades.push({ coin, price, amount, total: price * amount });
                saveData();
                tradeForm.reset();
                showModal();
            }
        });
    }

    if (checkPriceBtn) {
        checkPriceBtn.addEventListener('click', async () => {
            const coinId = document.getElementById('coinName').value.toLowerCase().trim();
            const priceInput = document.getElementById('buyPrice');
            const originalText = checkPriceBtn.textContent;
            if(!coinId) return alert("Isi nama koin dulu!");
            checkPriceBtn.textContent = "...";
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=idr`);
                const data = await res.json();
                if(data[coinId]) priceInput.value = data[coinId].idr;
                else alert("Koin tidak ditemukan!");
            } catch (e) { alert("Gagal koneksi."); }
            finally { checkPriceBtn.textContent = originalText; }
        });
    }

    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if(history.length === 0) return alert("Data kosong!");
            let csv = "data:text/csv;charset=utf-8,Tanggal,Koin,Jumlah,Harga Jual,Profit\n";
            history.forEach(i => { csv += `${i.date},${i.coin},${i.amount},${i.sellPrice},${i.profit}\n`; });
            const link = document.createElement("a");
            link.href = encodeURI(csv);
            link.download = "Laporan_Cryptofolio.csv";
            link.click();
        });
    }

    // Global Functions
    window.sellTrade = function(index) {
        const trade = trades[index];
        let sellAmount = prompt(`Jual berapa ${trade.coin}? (Max: ${trade.amount})`, trade.amount);
        if(sellAmount === null) return;
        sellAmount = parseFloat(sellAmount);
        if(isNaN(sellAmount) || sellAmount <= 0 || sellAmount > trade.amount) return alert("Jumlah salah!");

        let sellPrice = prompt(`Harga jual per koin (IDR)?`, trade.price);
        if(sellPrice === null) return;
        sellPrice = parseFloat(sellPrice);

        const costBasis = trade.price * sellAmount;
        const revenue = sellPrice * sellAmount;
        const profit = revenue - costBasis;

        trade.amount -= sellAmount;
        trade.total = trade.amount * trade.price;
        if(trade.amount <= 0.00000001) trades.splice(index, 1);

        history.push({
            date: getCurrentDate(),
            coin: trade.coin,
            amount: sellAmount,
            sellPrice,
            profit
        });

        saveData();
        alert(`Sukses! Profit: ${formatRupiah(profit)}`);
    };

    window.deleteTrade = function(index) {
        if(confirm("Hapus holding ini?")) {
            trades.splice(index, 1);
            saveData();
        }
    };

    window.deleteHistory = function(index) {
        if(confirm("Hapus riwayat ini?")) {
            history.splice(index, 1);
            saveData();
        }
    };

    // Modal
    function showModal() { if(successModal) successModal.classList.remove('hidden'); }
    if(closeModalBtn) closeModalBtn.onclick = () => successModal.classList.add('hidden');
    window.onclick = (e) => { if(e.target === successModal) successModal.classList.add('hidden'); };
}