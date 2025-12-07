import { useState, useEffect } from 'react';
import api from '../services/api';

export default function TestPage() {
  const [status, setStatus] = useState({
    backendStatus: 'checking',
    mongodbStatus: 'checking',
    barangCount: 0,
    error: null
  });

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test 1: Ping backend
        const backendRes = await api.get('/barang');
        console.log('✅ Backend terhubung!', backendRes.data);

        setStatus(prev => ({
          ...prev,
          backendStatus: 'connected',
          mongodbStatus: 'connected',
          barangCount: backendRes.data.length || 0
        }));
      } catch (err) {
        console.error('❌ Koneksi gagal:', err);
        setStatus(prev => ({
          ...prev,
          backendStatus: 'disconnected',
          mongodbStatus: 'disconnected',
          error: err.message
        }));
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: '40px 20px', fontFamily: 'system-ui' }}>
      <h1 style={{ color: '#333' }}>🔍 Test Koneksi Backend & Frontend</h1>

      <div style={{
        background: status.backendStatus === 'connected' ? '#d4edda' : '#f8d7da',
        border: `2px solid ${status.backendStatus === 'connected' ? '#28a745' : '#dc3545'}`,
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: status.backendStatus === 'connected' ? '#155724' : '#721c24' }}>
          {status.backendStatus === 'connected' ? '✅ Backend Connected' : '❌ Backend Disconnected'}
        </h2>
        <p style={{ margin: 0 }}>
          <strong>Status:</strong> {status.backendStatus === 'connected' ? 'API siap melayani' : 'Gagal koneksi ke API'}
        </p>
        <p style={{ margin: '5px 0 0 0' }}>
          <strong>Total Barang:</strong> {status.barangCount}
        </p>
      </div>

      <div style={{
        background: status.mongodbStatus === 'connected' ? '#d4edda' : '#f8d7da',
        border: `2px solid ${status.mongodbStatus === 'connected' ? '#28a745' : '#dc3545'}`,
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: status.mongodbStatus === 'connected' ? '#155724' : '#721c24' }}>
          {status.mongodbStatus === 'connected' ? '✅ MongoDB Connected' : '❌ MongoDB Disconnected'}
        </h2>
        <p style={{ margin: 0 }}>
          <strong>Status:</strong> {status.mongodbStatus === 'connected' ? 'Database siap' : 'Gagal koneksi ke database'}
        </p>
      </div>

      {status.error && (
        <div style={{
          background: '#f8d7da',
          border: '2px solid #dc3545',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#721c24' }}>⚠️ Error Details</h3>
          <pre style={{ margin: 0, color: '#721c24', overflow: 'auto' }}>
            {status.error}
          </pre>
        </div>
      )}

      <div style={{
        background: '#e7f3ff',
        border: '2px solid #0ea5e9',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#0369a1' }}>📋 Informasi</h3>
        <ul style={{ margin: 0, color: '#0369a1' }}>
          <li>Frontend URL: http://localhost:5173</li>
          <li>Backend URL: http://localhost:5000</li>
          <li>API Base URL: http://localhost:5000/api</li>
        </ul>
      </div>
    </div>
  );
}
