import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page';


// describe('Home', () => {
//     it('should have Docs title',()=>{
//         render(<Home />);  //arrange
//         const text = screen.getByText('Docs');  //act
//         //assert
//         expect(text).toBeInTheDocument();
//     })
// })


// it('should contain the text "information"', () => {
//     render(<Home />);  //arrange
//     const text = screen.getByText(/information/i);  //act
//     //assert
//     expect(text).toBeInTheDocument();
// })

// it('should have a heading', () => {
//     render(<Home />);  //arrange
//     const text = screen.getByRole('heading', { name: 'Learn' });  //act
//     //assert
//     expect(text).toBeInTheDocument();
// })



describe('Home', () => {
  it('should have Docs link', () => {
    render(<Home />);
    const text = screen.getByText(/read our docs/i);
    expect(text).toBeInTheDocument();
  });

  it('should have a Learn link', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: 'Learn' });
    expect(link).toBeInTheDocument();
  });
});
