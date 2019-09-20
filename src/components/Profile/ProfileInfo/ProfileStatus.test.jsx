import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';


describe("ProfileDtatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="some status"/>)
        const instatance = component.getInstance();
        expect(instatance.state.status).toBe("some status")
    })

    test("after creation span with status should be displayed with correct status", () => {
        const component = create(<ProfileStatus status="some status"/>)
        const root = component.root;
        let span = root.findByType("span")
        expect(span.length).toBe(1)
    })
})