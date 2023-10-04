import { FormEvent } from 'react';
import { MdSearch } from "react-icons/md";

interface SearchFieldProps {
    onChange: (evt: FormEvent<HTMLInputElement>) => void;
}

const SearchField = ({onChange}: SearchFieldProps) => {
    return (
        <div className="search-wrap">
            <input className="task-search"
                name="title"
                type="text"
                placeholder="Search by title or number of task"
                onChange={onChange}
            />
            <span className="search-label">
                <MdSearch />
            </span>
        </div> 
    )
}

export default SearchField;