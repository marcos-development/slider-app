import React from 'react';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import SliderValues from './SliderValues';


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


describe('<SliderValues />', () => {

    beforeEach(async () => {
        render(<SliderValues values={[35.99, 4.99, 100.99, 1.99, 50.99, 20.99, 70.99]} />);
        await act(() => sleep(1000));
    });

    test('Test Validate basic', async () => {
        
        screen.getByText("Fixed Range");
        screen.getByText("1.99€");
        screen.getByText("100.99€");
    });

    test('Test moved buttons', async () => {
        const inputMin = screen.getByTestId('test_min');
        fireEvent.mouseMove(inputMin, {pageX: 750});
        await act(() => sleep(1000));
        screen.getByText("1.99€");
        // fireEvent.change(inputMin, { style: { 'margin-left': 250 } });

    });
});