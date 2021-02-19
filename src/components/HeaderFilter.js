import { Container, Form, Col } from 'react-bootstrap';

export default function CharactersFilter({ listType }){
    return (
        <Container className="pt-4">
            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Search by</Form.Label>
                    <Form.Control />
                </Form.Group>
                {listType === 'comics' ? 
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Filter</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>Title</option>
                        <option>Issue Number</option>
                    </Form.Control>
                </Form.Group>
                : null}
                {listType === 'characters' ?
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Filter</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>Name</option>
                        <option>Comics</option>
                        <option>Stories</option>
                    </Form.Control>
                </Form.Group> : 
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Format</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option value="comic">comic</option>
                        <option value="magazine">magazine</option>
                        <option value="trade paperback">trade paperback</option>
                        <option value="hardcover">hardcover</option>
                        <option value="digest">digest</option>
                        <option value="graphic novel">graphic novel</option>
                        <option value="digital comic">digital comic</option>
                        <option value="infinite comic">infinite comic</option>
                    </Form.Control>
                </Form.Group>}
                
            </Form.Row>
        </Container>
    )
}