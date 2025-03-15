"use client"
import React, { useEffect, useState } from "react";

export default function MessageInbox() {
  // Sample static data
  const messages = [
    {
      id: 1,
      content: "Oi, tudo bem?",
      createdAt: "2023-10-24 09:30",
      updatedAt: "2023-10-24 09:30",
    },
    {
      id: 2,
      content: "Opa, bom dia",
      createdAt: "2023-10-24 10:15",
      updatedAt: "2023-10-24 10:15",
    },
    {
      id: 3,
      content: "Beleza?",
      createdAt: "2023-10-24 11:45",
      updatedAt: "2023-10-24 11:45",
    },
    {
      id: 4,
      content: "Oi",
      createdAt: "2023-10-24 13:20",
      updatedAt: "2023-10-24 13:20",
    },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white', padding: '16px' }}>
            <h1 style={{ fontSize: '20px', marginBottom: '8px' }}>Minhas Mensagens</h1>
  <div style={{ backgroundColor: 'black', border: '1px solid #2d2d2d', color: 'white', padding: '16px' }}>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #2d2d2d' }}>
            <th style={{ textAlign: 'left', padding: '8px 16px' }}>ID</th>
            <th style={{ textAlign: 'left', padding: '8px 16px' }}>Conteúdo</th>
            <th style={{ textAlign: 'left', padding: '8px 16px' }}>Data de Criação</th>
            <th style={{ textAlign: 'left', padding: '8px 16px' }}>Data de Atualização</th>
            <th style={{ textAlign: 'left', padding: '8px 16px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id} style={{ borderBottom: '1px solid #2d2d2d' }}>
              <td style={{ padding: '12px 16px' }}>{message.id}</td>
              <td style={{ padding: '12px 16px' }}>{message.content}</td>
              <td style={{ padding: '12px 16px' }}>{message.createdAt}</td>
              <td style={{ padding: '12px 16px' }}>{message.updatedAt}</td>
              <td style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
                <button style={{ height: '32px', width: '32px', border: '1px solid #3d3d3d', backgroundColor: 'transparent' }}>
                  <span style={{ fontSize: '16px', display: 'inline-block', width: '16px' }}>✏️</span>
                  <span style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>Editar</span>
                </button>
                <button style={{ height: '32px', width: '32px', border: '1px solid #3d3d3d', backgroundColor: 'transparent', color: 'red' }}>
                  <span style={{ fontSize: '16px', display: 'inline-block', width: '16px' }}>🗑️</span>
                  <span style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>Excluir</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  )
}

