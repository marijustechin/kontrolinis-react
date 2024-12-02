import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main className="ms-container mt-4">
      <section className="w-full">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="h-[400px] bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] bg-center bg-no-repeat">
                  <h1 className="text-center text-3xl mb-10">
                    404 - Nerastas puslpis
                  </h1>
                </div>

                <div className="contant_box_404">
                  <p>Tokio puslapio svetainėje nėra!</p>
                  <button
                    onClick={() => navigate(-1)}
                    type="button"
                    className="px-3 py-2 border rounded-lg"
                  >
                    Grįžti atgal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
