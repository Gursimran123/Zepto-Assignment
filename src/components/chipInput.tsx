import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent, MouseEvent } from 'react';
import './chipInput.css'; 

interface ChipInputProps {
  items: { name: string; email: string }[];
}

const ChipInput: React.FC<ChipInputProps> = ({ items }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setHighlightedIndex(null);
    setShowSuggestions(value !== '');
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      handleAddChip();
    } else if (e.key === 'Backspace' && inputValue === '') {
      handleRemoveLastChip();
    }
  };

  const handleAddChip = () => {
    if (inputValue.trim() !== '') {
      setSelectedItems([...selectedItems, inputValue]);
      setInputValue('');
      setHighlightedIndex(null);
      setShowSuggestions(false);
    }
  };

  const handleRemoveChip = (index: number) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  const handleRemoveLastChip = () => {
    if (selectedItems.length > 0) {
      const lastChipIndex = selectedItems.length - 1;
      setHighlightedIndex(lastChipIndex);
      handleRemoveChip(lastChipIndex);
    }
  };

  const handleItemSelect = (item: { name: string; email: string }) => {
    handleAddChip();
    setHighlightedIndex(null);
    setInputValue(item.name);
    inputRef.current?.focus();
  };

  const handleInputClick = () => {
    setShowSuggestions(true);
  };

  const handleSuggestionsClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

 const handleClickOutside: EventListener = (e: Event) => {
  if (inputRef.current && !inputRef.current.contains(e.target as HTMLElement)) {
    setShowSuggestions(false);
  }
};

useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }

  window.addEventListener('click', handleClickOutside);

  return () => {
    window.removeEventListener('click', handleClickOutside);
  };
}, []);
  return (
    <div className="chip-input-container">
      <div className="chips-container">
        {selectedItems.map((item, index) => (
          <div key={index} className={`chip`}>
            {item}
            <button className="remove-chip" onClick={() => handleRemoveChip(index)}>
              X
            </button>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onClick={handleInputClick}
          placeholder="Add new user..."
        />
        {showSuggestions && (
          <div className="suggestions-container" onClick={handleSuggestionsClick}>
            {items
              .filter((item) => !selectedItems.includes(item.name))
              .filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()))
              .map((item, index) => (
                <div
                  key={index}
                  className={`suggestion ${highlightedIndex === index ? 'highlighted' : ''}`}
                  onClick={() => handleItemSelect(item)}
                >
                  <p>{item.name}</p>
                  <p>{item.email}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChipInput;
