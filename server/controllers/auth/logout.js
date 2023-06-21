const logout = async (req, res) => {
    try {
        // Limpiar el token en el localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        return res.status(200).json({
            msg: 'Logged out successfully',
            authToken: null,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

module.exports = logout;
