import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';
import { UserOutlined } from '@ant-design/icons';

describe('Button Component', () => {
  test('renders correctly with label', () => {
    render(<Button label="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('renders with right icon', () => {
    render(<Button label="Test" rightIcon={<UserOutlined data-testid="right-icon" />} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  test('applies buttonWrapperClassName correctly', () => {
    const { container } = render(<Button buttonWrapperClassName="wrapper-class" />);
    // Since we can't directly access DOM nodes, we'll check if the rendered output
    // contains an element with the class
    expect(container.innerHTML).toContain('wrapper-class');
  });
});