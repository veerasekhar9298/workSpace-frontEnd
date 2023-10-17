/* eslint-disable jsx-a11y/anchor-is-valid */
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Facebook, Instagram, Twitter,ChatDots, Youtube,Google, Linkedin , House, Envelope, Telephone, Printer} from 'react-bootstrap-icons';










function Footer (props){

    return(<>
            <MDBFooter bgColor='light' className='text-center text-lg-start text-muted mt-2' >
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
          <Facebook size={24} />
      
          </a>
          <a href='' className='me-4 text-reset'>
          <Twitter size={24}  />
     
          </a>
          <a href='' className='me-4 text-reset'>
          <Youtube size={24}  />
          </a>
          <a href='' className='me-4 text-reset'>
          <Instagram size={24}  />
      
          </a>
          <a href='' className='me-4 text-reset'>
          <Google size={24}  />
     
          </a>
          <a href='' className='me-4 text-reset'>
          <Linkedin size={24}  />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Share Space
              </h6>
              <p>
              Work in a shared work environment where you can book workspace and use it for the duration of your project
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>COMPANY</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Global locations
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Mission
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Inclusion & Diversity
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Newsroom
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Blog
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>PARTNERSHIPS</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Brokers
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Landlords
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Refer a Friend
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Event Planners
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
              <House size={24} className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
              <Envelope size={24} className="me-3" />
                ShareSpace@gmail.com
              </p>
              <p>
              <Telephone size={24} className="me-3" /> + 91 1234 567 88
              </p>
              <p>
              <Printer size={24} className="me-3" /> + 91 1234 567 89
              </p>
              <p>
              <ChatDots size={24}  className="me-2" />  + 91 1234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright:
        <a className='text-reset fw-bold text-decoration-none' href='https://mdbootstrap.com/'>
          ShareSpace.com
        </a>
      </div>
    </MDBFooter>
        </>)
}

export default Footer
