import React from 'react';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import Range from './Range';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('<Range /> - Bloque de tests', () => {

    test('Basic tests', async () => {
        const component = render(<Range type={'normal'} />);
        await act(() => sleep(2000));
        component.getByText('Normal Range');
    });
});
