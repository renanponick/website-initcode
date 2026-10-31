import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Courses from '../pages/Courses';
import Home from '../pages/Home';
import LanguageRecommendationForm from '../pages/LanguageRecomendation';
import Notebooks from '../pages/Notebooks';
import NotFound from '../pages/NotFound';
import RecomendationShowcase from '../pages/RecomendationShowcase';

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/recomendation" element={<RecomendationShowcase />} />
        <Route path="/recomendation-showcase" element={<RecomendationShowcase />} />
        <Route path="/notebooks" element={<Notebooks />} />
        <Route path="/language-recomendation" element={<LanguageRecommendationForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
