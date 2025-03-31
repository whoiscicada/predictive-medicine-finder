
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Camera, Check } from "lucide-react";
import { fetchSuggestions } from "@/lib/medicationApi";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MedicationSearchProps {
  onSearch: (medicationName: string) => void;
  isLoading: boolean;
}

const MedicationSearch: React.FC<MedicationSearchProps> = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setOpen(false);
    onSearch(suggestion);
  };

  useEffect(() => {
    const getSuggestions = async () => {
      if (inputValue.length >= 2) {
        setIsSearching(true);
        const result = await fetchSuggestions(inputValue);
        setSuggestions(result);
        if (result.length > 0) {
          setOpen(true);
        }
        setIsSearching(false);
      } else {
        setSuggestions([]);
        setOpen(false);
      }
    };

    const debounce = setTimeout(() => {
      getSuggestions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [inputValue]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Popover open={open && suggestions.length > 0} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div className="w-full">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter medication name..."
                    className="pr-10 h-12 w-full"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)] max-h-[300px] overflow-y-auto">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {suggestions.map((suggestion, index) => (
                        <CommandItem
                          key={index}
                          onSelect={() => handleSuggestionClick(suggestion)}
                          className="cursor-pointer"
                        >
                          {suggestion}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                  <CommandEmpty>No results found</CommandEmpty>
                </Command>
              </PopoverContent>
            </Popover>
            {isSearching && (
              <div className="absolute right-3 top-3">
                <Loader2 className="h-5 w-5 animate-spin text-medicine-secondary" />
              </div>
            )}
          </div>
          <Button 
            onClick={handleSearch} 
            className="bg-medicine-primary hover:bg-medicine-secondary h-12 px-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <Search className="h-5 w-5 mr-2" />
            )}
            Search
          </Button>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                className="h-12 aspect-square bg-medicine-light border-medicine-primary/20 hover:bg-medicine-light/80"
                asChild
              >
                <Link to="/scanner">
                  <Camera className="h-5 w-5 text-medicine-primary" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Scan prescription</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default MedicationSearch;
