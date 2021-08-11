import React from 'react';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import SliderNormal from './SliderNormal';


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


describe('<SliderNormal />', () => {

    beforeEach(async () => {
        render(<SliderNormal min={10} max={500} />);
        await act(() => sleep(1000));
    });

    test("Test Validate input value = 20", async () => {
        
        const inputMin = screen.getByTestId('inputMin');
        fireEvent.change(inputMin, { target: { value: 20 } });
        await act(() => sleep(2000));
        expect(inputMin.value).toBe("20");
    });

    test("Test Validate Min: input value minor to minimun", async () => {
        
        const inputMin = screen.getByTestId('inputMin');
        fireEvent.change(inputMin, { target: { value: 5 } });
        await act(() => sleep(2000));
        expect(inputMin.value).toBe("10");
    });

    test('Test Validate Max: input value mayor to maximo', async () => {
        const inputMax = screen.getByTestId('inputMax');
        fireEvent.change(inputMax, { target: { value: 550 } });
        await act(() => sleep(2000));
        expect(inputMax.value).toBe("500");
    });

    test('Test Validate Compare: input value min exceed to max', async () => {
        const inputMin = screen.getByTestId('inputMin');
        const inputMax = screen.getByTestId('inputMax');
        fireEvent.change(inputMax, { target: { value: 250 } });
        await act(() => sleep(2000));
        fireEvent.change(inputMin, { target: { value: 450 } });
        await act(() => sleep(2000));
        expect(inputMin.value).toBe("10");
    });
});