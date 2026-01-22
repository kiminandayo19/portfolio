import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SectionHeader } from '@/components/molecules/SectionHeader';

describe('SectionHeader Molecule', () => {
  it('renders title correctly', () => {
    render(<SectionHeader title="Test Title" />);
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<SectionHeader title="Test Title" subtitle="Test Subtitle" />);
    const subtitleElement = screen.getByText('Test Subtitle');
    expect(subtitleElement).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<SectionHeader title="Test Title" />);
    const subtitleElement = screen.queryByText('Test Subtitle');
    expect(subtitleElement).not.toBeInTheDocument();
  });
});
