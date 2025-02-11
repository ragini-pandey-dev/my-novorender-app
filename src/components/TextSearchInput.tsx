import { FC, useState } from 'react';

interface TextSearchInputProps {
    onSearch: (query: string) => void;
}

const TextSearchInput: FC<TextSearchInputProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearchClick = () => {
        onSearch(query);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(query);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', position: "fixed", left: '30%', top: '3%' }}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Search..."
                style={{ padding: '8px', fontSize: '16px', flex: 1 }}
            />
            <button onClick={handleSearchClick} style={{ padding: '8px 16px', marginLeft: '8px', fontSize: '16px' }}>
                Search
            </button>
        </div>
    );
};

export default TextSearchInput;