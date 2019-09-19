import React, { useState, useRef } from 'react';

import styles from '../_styles/dashboardStyles.module.scss';


const SearchInput = (props) => {
    const [searchVal, setSearchVal] = useState('');
    const searchRef = useRef();

    const handleSubmit = () => {
        if (searchVal !== '' && (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(searchVal))) {
            props.addFriend(searchVal);
        };

        setSearchVal('');
        searchRef.current.value = '';
    };

    return (
        <div className={styles.search}>
            <input ref={searchRef} placeholder="Enter email" type="search" onChange={(e) => setSearchVal(e.currentTarget.value)} onKeyUp={(e) => {if (e.which === 13) {handleSubmit()} } } />
            <i className="fas fa-plus-circle" onClick={handleSubmit} />
        </div>
    );
};


export default SearchInput;