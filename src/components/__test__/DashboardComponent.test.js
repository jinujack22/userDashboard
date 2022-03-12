import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {mount}  from 'enzyme';
import DashboardComponent from '../DashboardComponent';

Enzyme.configure({adapter : new Adapter()});

describe('Dashboard component :', () =>{

    beforeAll(()=>{

    });
    it('should load without breaking',()=>{
        const wrapper= mount(<DashboardComponent />);
        expect(wrapper).toBeDefined();
    });
})