import React from 'react';

// Import Jest DOM matchers
import '@testing-library/jest-dom';

// Set up global mocks
global.fetch = jest.fn();

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock Ant Design components
jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  
  return {
    ...antd,
    Layout: {
      Header: ({ children }) => <div data-testid="header">{children}</div>,
      Sider: ({ children }) => <div data-testid="sider">{children}</div>,
      Content: ({ children }) => <div data-testid="content">{children}</div>,
      Footer: ({ children }) => <div data-testid="footer">{children}</div>,
    },
    Menu: ({ children, selectedKeys, onClick }) => (
      <div data-testid="menu" data-selected-keys={selectedKeys} onClick={onClick}>
        {children}
      </div>
    ),
    Typography: {
      Title: ({ children }) => <div data-testid="title">{children}</div>,
      Text: ({ children }) => <div data-testid="text">{children}</div>,
      Paragraph: ({ children }) => <div data-testid="paragraph">{children}</div>,
    },
    Card: ({ children, title }) => (
      <div data-testid="card" data-title={title}>
        {children}
      </div>
    ),
    Alert: ({ message, description, type }) => (
      <div data-testid="alert" data-message={message} data-description={description} data-type={type}></div>
    ),
    Select: ({ children, value, onChange }) => (
      <select data-testid="select" value={value} onChange={e => onChange && onChange(e.target.value)}>
        {children}
      </select>
    ),
    Button: ({ children, type, onClick, disabled }) => (
      <button data-testid="button" data-type={type} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    ),
  };
});